import type { WikiID } from "../../model/contanerTypes.js";
import type { WikiDataContainer } from "../../model/WikiDataContainer.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";

export class DeleteEntitiesWithoutLabels implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent) {}

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    const wikiIds = new Set<WikiID>();
    for (const [id, entity] of container.allData) {
      if (!entity.labels || entity.labels.size === 0) {
        wikiIds.add(id);
      }
    }
    container.deleteByWikiIds(wikiIds);

    return container;
  }


}
