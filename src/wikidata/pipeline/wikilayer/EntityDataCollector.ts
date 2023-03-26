import type { WikiID } from "../../model/contanerTypes.js";
import { WikiDataContainer } from "../../model/WikiDataContainer.js";
import { WikiDataEntity } from "../../model/WikiDataEntity.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Item, Property, Wbk, WmLanguageCode } from "wikibase-sdk";
// @ts-ignore
import type { WbGetEntitiesResponse } from "wikibase-sdk/dist/helpers/parse_responses";

export class EntityDataCollector implements WikiPipelineComponent {

  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly wbk: Wbk,
              private readonly requiredLanguages: WmLanguageCode[]) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();

    const pulledData = new Map<WikiID, WikiDataEntity>();
    const allIds = [
      ...container.conceptsWikiToOstisMap.keys(),
      ...container.instancesWikiToOstisMap.keys(),
      ...container.propertiesWikiToOstisMap.keys()
    ];
    // WikiData API limitation. Only 50 id available for single request
    const chunkSize = 50;
    for (let i = 0; i < allIds.length; i += chunkSize) {
      const chunk = allIds.slice(i, i + chunkSize);
      const tempPulledData = await this.pullDataForIds(chunk);
      tempPulledData.forEach((v, k) => pulledData.set(k, v));
    }

    return new WikiDataContainer(
      pulledData,
      container.conceptsWikiToOstisMap,
      container.propertiesWikiToOstisMap,
      container.instancesWikiToOstisMap,
      container.classInstancesMap,
      container.triplets
    );

  }

  private async pullDataForIds(wikiIds: WikiID[]): Promise<Map<WikiID, WikiDataEntity>> {
    const result = new Map<WikiID, WikiDataEntity>();

    const url = this.wbk.getEntities({
      ids: wikiIds,
      languages: this.requiredLanguages,
      props: [`labels`, `descriptions`, `info`]
    });

    const documents = new Map<WikiID, Item | Property>();
    return await axios.get(url)
      .then((response: AxiosResponse<WbGetEntitiesResponse>) => {
        for (const key in response.data.entities) {
          documents.set(<`Q${number}` | `P${number}`>key, response.data.entities[key]);
        }
        for (const [key, value] of documents) {

          const labels = new Map<WmLanguageCode, string>();
          const descriptions = new Map<WmLanguageCode, string>();
          for (const lang in value.labels) {

            // @ts-ignore
            labels.set(lang, value.labels[lang].value);
          }

          for (const lang in value.descriptions) {
            // @ts-ignore
            descriptions.set(lang, value.descriptions[lang].value);
          }
          const title = value.labels?.[`en`]?.value;
          result.set(key, new WikiDataEntity(
            key,
            title ? title : ``,
            labels,
            descriptions
          ));

        }
        return result;
      });

  }
}
