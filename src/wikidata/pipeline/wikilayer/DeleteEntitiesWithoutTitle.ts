import type { WikiID } from "../../model/contanerTypes.js";
import type { WikiDataContainer } from "../../model/WikiDataContainer.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";

// Temporary solution, but very useful for current implementation
// What problem does this class solve? We can create inner Ostis idtfs only using english text,
// So if entity has no English label, it cannot be converted to Ostis entity
export class DeleteEntitiesWithoutTitle implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    const wikiIds = new Set<WikiID>();
    for (const [id, entity] of container.allData) {
      if (entity.title === ``) {
        wikiIds.add(id);
      }
    }
    container.deleteByWikiIds(wikiIds);
    return container;
  }
}
