import type { SemanticID } from "../../model/contanerTypes";
import type { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../../WikiPipelineComponent";

// This class is mainly used for relations like P2959 (permanent duplicate)
//  Not a very flexible solution, but still works fine such cases
export class DeleteEntitiesByRelations implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly relations: Set<SemanticID>) {}

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    const wikiIds = new Set<SemanticID>();
    container.triplets
      .filter(e => this.relations.has(e.property))
      .forEach(e => {
        wikiIds.add(e.node2);
      });
    container.deleteByWikiIds(wikiIds);
    return container;
  }

}
