import type { WikiDataContainer } from "../../model/WikiDataContainer.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";

export class ClearIllegalCharactersFromDescription implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent) {
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    for (const [id, entity] of container.allData) {
      for (const [lang, text] of entity.descriptions) {
        //ToDO process [] constructions
        //entity.descriptions.set(lang, text.replace(`\\[(.*?)\\]`, ``));
        entity.descriptions.set(lang, text.replaceAll(`[`, ``).replaceAll(`]`, ``));
      }
    }
    return container;
  }

}
