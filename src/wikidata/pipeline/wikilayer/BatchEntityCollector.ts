import { mergeMaps, removeIfMap } from "../../model/collectionUtils";
import type { OstisID, SemanticID, SemanticTriplet, WmLanguageCode } from "../../model/contanerTypes";
import { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../../WikiPipelineComponent";
import type { AxiosResponse } from "axios";
import axios from "axios";

export class BatchEntityCollector implements WikiPipelineComponent {

  recursionDepth = 1;
  pagesCount = 1;
  triplets: SemanticTriplet[] = [];
  conceptsMap: Map<SemanticID, OstisID> = new Map();
  propertiesMap: Map<SemanticID, OstisID> = new Map();
  instancesMap: Map<SemanticID, OstisID> = new Map();

  keywords: Map<string, WmLanguageCode> = new Map();
  wikiIds: SemanticID[] = [];

  pulledEntityCache: Map<SemanticID, any> = new Map();

  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly requiredLanguages: WmLanguageCode[],
              private readonly wbk: any,
              keywords?: Map<string, WmLanguageCode>,
              wikiIds?: SemanticID[],
              recursionDepth?: number,
              pagesCount?: number) {
    if (keywords != undefined)
      keywords.forEach((v, k) => {
        this.keywords.set(k, v);
      });
    if (wikiIds != undefined)
      wikiIds.forEach(e => {
        this.wikiIds.push(e);
      });

    this.recursionDepth = recursionDepth ? recursionDepth : 1;
    this.pagesCount = pagesCount ? pagesCount : 1;
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();

    // convert titles to entity ids
    const wikiIdsFromTitles = await this.convertTitlesToWikiIds();
    wikiIdsFromTitles.forEach(e => {
      this.wikiIds.push(e);
    });

    await this.collectInfoAboutEntities();

    for (const [k, v] of this.conceptsMap) {
      container.conceptsWikiToOstisMap.set(k, v);
    }
    for (const [k,v] of this.propertiesMap){
      container.propertiesWikiToOstisMap.set(k, v);
    }
    for (const [k,v] of this.instancesMap){
      container.instancesWikiToOstisMap.set(k,v);
    }
    for (const triplet of this.triplets){
      container.triplets.push(triplet);
    }
    return container
  }

  private async collectInfoAboutEntities() {
    const url = this.wbk.getEntities({
      ids: this.wikiIds,
      languages: this.requiredLanguages,
      props: [`claims`]
    });
    await axios.get(url)
      .then((response: AxiosResponse) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        for (const key in response.data.entities) {
          // @ts-ignore
          this.pulledEntityCache.set(<`Q${number}` | `P${number}`>key, response.data.entities[key]);
        }
      });

    for (const wikiId of this.wikiIds) {
      await this.recCollectWikiEntities(wikiId, this.recursionDepth);
    }
  }

  private async recCollectWikiEntities(documentId: SemanticID, recursionDepth: number) {
    if (recursionDepth == 0)
      return;
    if (!documentId.startsWith(`Q`) && !documentId.startsWith(`P`))
      throw new Error(`Parser can only work with Items(Q) and Properties(P), but not your item -- ` + documentId);

    const connectedElements: Map<SemanticID, SemanticID[]> = new Map<SemanticID, SemanticID[]>();
    const result = await this.pullEntity(documentId);
    if (result.claims) {
      mergeMaps(this.getConnectedElements(result.claims), connectedElements);
    }

    this.conceptsMap.set(documentId, ``);
    connectedElements.forEach((v, k) => {
      this.propertiesMap.set(k, ``);
      v.forEach(e => {
        this.triplets.push({ node1: documentId, property: k, node2: e });
        this.conceptsMap.set(e, ``);
      });
    });

    for (const [, v] of connectedElements) {
      for (const e of v) {
        await this.recCollectWikiEntities(e, recursionDepth - 1);
      }
    }
  }

  private async pullEntity(id: SemanticID): Promise<any> {
    if (this.pulledEntityCache.has(id)) {
      const entity = this.pulledEntityCache.get(id);
      if (!entity) throw new Error(`Inconsistency: entity with id ${id} is cached, but undefined`);
      return entity;
    }

    const url = this.wbk.getEntities({
      ids: id,
      languages: this.requiredLanguages,
      props: [`claims`]
    });

    let result: any | undefined = undefined;
    await axios.get(url)
      .then((response: AxiosResponse) => {
        // @ts-ignore
        this.pulledEntityCache.set(id, response.data.entities[id]);
        // @ts-ignore
        result = response.data.entities[id];
      });

    if (!result) {
      throw new Error(`Error while pulling entity -- ${id}`);
    }
    return result;
  }

  private async convertTitlesToWikiIds(): Promise<SemanticID[]> {
    const result: SemanticID[] = [];
    for (const [keyword, language] of this.keywords) {
      const temp = this.wbk.searchEntities({ search: keyword, language: language, limit: this.pagesCount });
      await axios.get(temp)
        .then((response: AxiosResponse) => {
          response.data.search.forEach((e: any) => {
            result.push(<`Q${number}` | `P${number}`>e.id);
          });
        });
    }
    return result;
  }

  private getConnectedElements(claims: any): Map<SemanticID, SemanticID[]> {
    const result: Map<SemanticID, SemanticID[]> = new Map();
    for (const claim in claims) {
      // @ts-ignore
      result.set(<`Q${number}` | `P${number}`>claim, claims[claim]
        // @ts-ignore
        .map((e: any) => e.mainsnak)
        .map((e: any) => e.datavalue)
        .map((e: any) => e?.value)
        .filter((e: any) => e)
        .filter((e: any) => typeof e != `string`) // some magic starts here
        .filter((e: any) => `id` in e) // we need any object with field id
        .map((e: { id: any; }) => e.id) // that means we have id of type Item(Q) or Property(P)
        .filter((e: string) => e.startsWith(`Q`)) // but it is difficult to work with properties latter
      );
    }
    removeIfMap(result, (k, v) => v.length === 0);
    return result;
  }
}
