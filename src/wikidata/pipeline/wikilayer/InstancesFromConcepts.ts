import type { SemanticID, SemanticTriplet } from "../../model/contanerTypes";
import type { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../../WikiPipelineComponent";

export class InstancesFromConcepts implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly instanceOfRelations: Set<string>,
              private readonly hasInstanceRelations: Set<string>,
              private readonly subclassRelation: Set<string>) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    const classes = new Set<SemanticID>();
    container.triplets
      .filter((e: SemanticTriplet) => this.subclassRelation.has(e.property))
      .forEach((e: SemanticTriplet) => {
        classes.add(e.node1);
        classes.add(e.node2);
      });

    container.triplets
      .filter((e: SemanticTriplet) => !container.propertiesWikiToOstisMap.has(e.node1))
      .filter((e: SemanticTriplet) => this.hasInstanceRelations.has(e.property))
      .forEach((e: SemanticTriplet) => {
        classes.add(e.node1);
        container.instancesWikiToOstisMap.set(e.node2, ``);
        container.conceptsWikiToOstisMap.delete(e.node2);
        container.addInstanceForClass(e.node1, new Set<SemanticID>().add(e.node2));
      });

    container.triplets
      .filter((e: SemanticTriplet) => this.instanceOfRelations.has(e.property) &&
        !classes.has(e.node1) &&
        !container.propertiesWikiToOstisMap.has(e.node1))
      .forEach((e: SemanticTriplet) => {
        container.instancesWikiToOstisMap.set(e.node1, ``);
        container.conceptsWikiToOstisMap.delete(e.node1);
        container.addInstanceForClass(e.node2, new Set<SemanticID>().add(e.node1));
      });

    return container;
  }


}
