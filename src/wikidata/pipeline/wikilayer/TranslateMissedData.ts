import type { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../WikiPipelineComponent";

// Idk free library for text translation
export class TranslateMissedData implements WikiPipelineComponent{
  async execute(): Promise<WikiDataContainer> {
    throw new Error(`Not implemented yet`)
  }

}
