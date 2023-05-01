import { WikiPipelineComponent } from "../WikiPipelineComponent";
import { WikiDataContainer } from "../model/WikiDataContainer";

export class PipelineInit implements WikiPipelineComponent {

  async execute(): Promise<WikiDataContainer> {
    return new WikiDataContainer(
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      []);
  }

}
