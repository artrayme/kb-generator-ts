import { mergeMaps, removeIfMap } from "../../model/collectionUtils.js";
import type { WikiID, WikiTriplet } from "../../model/contanerTypes.js";
import { WikiDataContainer } from "../../model/WikiDataContainer.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Claims, Item, SearchResponse, SearchResult, Snak, Wbk, WmLanguageCode } from "wikibase-sdk";
// @ts-ignore
import type { WbGetEntitiesResponse } from "wikibase-sdk/dist/helpers/parse_responses";
// @ts-ignore
import type { PropertyClaims, SnakValue } from "wikibase-sdk/src/types/claim.js";

export class BatchEntityCollector implements WikiPipelineComponent {

  recursionDepth = 1;
  pagesCount = 1;
  triplets: WikiTriplet[] = [];
  conceptsMap: Map<WikiID, string> = new Map();
  propertiesMap: Map<WikiID, string> = new Map();
  instancesMap: Map<WikiID, string> = new Map();

  keywords: Map<string, WmLanguageCode> = new Map();
  wikiIds: WikiID[] = [];
  requiredLanguages: WmLanguageCode[];

  wbk: Wbk;

  pulledEntityCache: Map<WikiID, Item> = new Map();

  constructor(requiredLanguages: WmLanguageCode[],
              wbk: Wbk,
              keywords?: Map<string, WmLanguageCode>,
              wikiIds?: WikiID[],
              recursionDepth?: number,
              pagesCount?: number) {
    this.wbk = wbk;
    this.requiredLanguages = requiredLanguages;
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

    // convert titles to entity ids
    const wikiIdsFromTitles = await this.convertTitlesToWikiIds();
    wikiIdsFromTitles.forEach(e => {
      this.wikiIds.push(e);
    });

    await this.collectInfoAboutEntities();

    return new WikiDataContainer(
      new Map(),
      this.conceptsMap,
      this.propertiesMap,
      this.instancesMap,
      new Map(),
      this.triplets);
  }

  private async collectInfoAboutEntities() {
    const url = this.wbk.getEntities({
      ids: this.wikiIds,
      languages: this.requiredLanguages,
      props: [`claims`]
    });
    await axios.get(url)
      .then((response: AxiosResponse<WbGetEntitiesResponse>) => {
        for (const key in response.data.entities) {
          this.pulledEntityCache.set(<`Q${number}` | `P${number}`>key, response.data.entities[key]);
        }
      });

    for (const wikiId of this.wikiIds) {
      await this.recCollectWikiEntities(wikiId, this.recursionDepth);
    }
  }

  private async recCollectWikiEntities(documentId: WikiID, recursionDepth: number) {
    if (recursionDepth == 0)
      return;
    if (!documentId.startsWith(`Q`) && !documentId.startsWith(`P`))
      throw new Error(`Parser can only work with Items(Q) and Properties(P), but not your item -- ` + documentId);

    const connectedElements: Map<WikiID, WikiID[]> = new Map<WikiID, WikiID[]>();
    const result: Item = await this.pullEntity(documentId);
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

  private async pullEntity(id: WikiID): Promise<Item> {
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

    let result: Item | undefined = undefined;
    await axios.get(url)
      .then((response: AxiosResponse<WbGetEntitiesResponse>) => {
        this.pulledEntityCache.set(id, response.data.entities[id]);
        result = response.data.entities[id];
      });

    if (!result) {
      throw new Error(`Error while pulling entity -- ${id}`);
    }
    return result;
  }

  private async convertTitlesToWikiIds(): Promise<WikiID[]> {
    const result: WikiID[] = [];
    for (const [keyword, language] of this.keywords) {
      const temp = this.wbk.searchEntities({ search: keyword, language: language, limit: this.pagesCount });
      await axios.get(temp)
        .then((response: AxiosResponse<SearchResponse>) => {
          response.data.search.forEach((e: SearchResult) => {
            result.push(<`Q${number}` | `P${number}`>e.id);
          });
        });
    }
    return result;
  }

  private getConnectedElements(claims: Claims): Map<WikiID, WikiID[]> {
    const result: Map<WikiID, WikiID[]> = new Map();
    for (const claim in claims) {
      // @ts-ignore
      result.set(<`Q${number}` | `P${number}`>claim, claims[claim]
        .map((e: PropertyClaims) => e.mainsnak)
        .map((e: Snak) => e.datavalue)
        .map((e: SnakValue) => e?.value)
        .filter((e: Item) => e)
        .filter((e: any) => typeof e != `string`) // some magic starts here
        .filter((e: any) => `id` in e) // we need any object with field id
        .map((e: { id: any; }) => e.id) // that means we have id of Item(Q) or Property(P)
        .filter((e: string) => e.startsWith(`Q`)) // but it is difficult to work with properties latter
      );
    }
    removeIfMap(result, (k, v) => v.length === 0);
    return result;
  }
}
