import type { WikiDataContainer } from "../../model/WikiDataContainer.js";
import type { WikiPipelineComponent } from "../WikiPipelineComponent.js";

// Idk free library for text translation
export class TranslateMissedData implements WikiPipelineComponent{
  async execute(): Promise<WikiDataContainer> {
    throw new Error(`Not implemented yet`)
  }

}
