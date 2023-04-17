import type { OstisID, WikiID } from "../../model/contanerTypes";
import type { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../WikiPipelineComponent";

export class DeleteEntitiesWithInvalidOstisIdtf implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    const wikiIds = new Set<WikiID>();
    const allMappers = new Map<WikiID, OstisID>([
      ...container.conceptsWikiToOstisMap.entries(),
      ...container.propertiesWikiToOstisMap.entries(),
      ...container.instancesWikiToOstisMap.entries()
    ]);
    // check non-ascii symbols
    allMappers.forEach((v, k) => {
      if (v.match(`[^\x00-\x7F]+`) !== null) {
        wikiIds.add(k);
      }
    });
    container.deleteByWikiIds(wikiIds);
    return container;
  }
}
