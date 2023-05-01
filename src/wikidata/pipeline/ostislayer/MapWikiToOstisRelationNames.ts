import { removeIfMap, replaceAll } from "../../model/collectionUtils";
import type { OstisID, SemanticID } from "../../model/contanerTypes";
import type { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../../WikiPipelineComponent";

export class MapWikiToOstisRelationNames implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly relations: Map<SemanticID, OstisID>) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    replaceAll(container.propertiesWikiToOstisMap, (k: SemanticID, v: OstisID): string => {
      const relation = this.relations.get(k);
      return relation ? relation : v;
    });
    removeIfMap(container.allData, (k, v) => this.relations.has(v.wikiId));
    return container;
  }
}
