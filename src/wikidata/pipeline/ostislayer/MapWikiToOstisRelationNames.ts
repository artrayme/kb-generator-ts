import { removeIfMap, replaceAll } from "../../model/collectionUtils.js";
import type { OstisID, WikiID } from "../../model/contanerTypes.js";
import type { WikiDataContainer } from "../../model/WikiDataContainer.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";

export class MapWikiToOstisRelationNames implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly relations: Map<WikiID, OstisID>) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    replaceAll(container.propertiesWikiToOstisMap, (k: WikiID, v: OstisID): string => {
      const relation = this.relations.get(k);
      return relation ? relation : v;
    });
    removeIfMap(container.allData, (k, v) => this.relations.has(v.wikiId));
    return container;
  }
}
