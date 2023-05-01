import { groupBy } from "../../model/collectionUtils";
import type { OstisID, SemanticID } from "../../model/contanerTypes";
import type { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../../WikiPipelineComponent";

// This class is looking for entities with the same ostis id
// And then leaves only the item with the minimal wiki id
// It is important because from the ostis side is not very good
// to we have different entities with the same id :)
export class DeleteOstisIdDuplicates implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();

    const toRemoveConcepts = this.getBadDuplicates(container.conceptsWikiToOstisMap);
    const toRemoveProperties = this.getBadDuplicates(container.propertiesWikiToOstisMap);
    const toRemoveInstances = this.getBadDuplicates(container.instancesWikiToOstisMap);

    const toDelete: Set<SemanticID> = new Set<SemanticID>(toRemoveConcepts.concat(toRemoveProperties, toRemoveInstances));
    container.deleteByWikiIds(toDelete);
    return container;
  }

  getBadDuplicates(wikiToOstisMap: Map<SemanticID, OstisID>): SemanticID[] {
    // group by ostis ids
    const grouped = groupBy(Array.of(...wikiToOstisMap.entries()), e => e[1]);

    // and analyze groups
    // leave only entity with minimal wiki id
    // add other entities into the array for deletion
    const toDelete: SemanticID[] = [];
    for (const ostisId in grouped) {
      // @ts-ignore
      if (grouped[ostisId].length > 1) {
        // @ts-ignore
        const sorted = grouped[ostisId].map(e => e[0]).sort((a, b) => Number(a.slice(1)) > Number(b.slice(1)) ? 1 : -1);
        toDelete.push(...sorted.slice(1));
      }
    }

    return toDelete;
  }

}
