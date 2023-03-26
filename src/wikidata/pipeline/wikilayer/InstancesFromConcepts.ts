import type { WikiID, WikiTriplet } from "../../model/contanerTypes.js";
import type { WikiDataContainer } from "../../model/WikiDataContainer.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";

export class InstancesFromConcepts implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly instanceOfRelations: Set<string>,
              private readonly hasInstanceRelations: Set<string>,
              private readonly subclassRelation: Set<string>) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    const classes = new Set<WikiID>();
    container.triplets
      .filter((e: WikiTriplet) => this.subclassRelation.has(e.property))
      .forEach((e: WikiTriplet) => {
        classes.add(e.node1);
        classes.add(e.node2);
      });

    container.triplets
      .filter((e: WikiTriplet) => !container.propertiesWikiToOstisMap.has(e.node1))
      .filter((e: WikiTriplet) => this.hasInstanceRelations.has(e.property))
      .forEach((e: WikiTriplet) => {
        classes.add(e.node1);
        container.instancesWikiToOstisMap.set(e.node2, ``);
        container.conceptsWikiToOstisMap.delete(e.node2);
        container.addInstanceForClass(e.node1, new Set<WikiID>().add(e.node2));
      });

    container.triplets
      .filter((e: WikiTriplet) => this.instanceOfRelations.has(e.property) &&
        !classes.has(e.node1) &&
        !container.propertiesWikiToOstisMap.has(e.node1))
      .forEach((e: WikiTriplet) => {
        container.instancesWikiToOstisMap.set(e.node1, ``);
        container.conceptsWikiToOstisMap.delete(e.node1);
        container.addInstanceForClass(e.node2, new Set<WikiID>().add(e.node1));
      });

    return container;
  }


}
