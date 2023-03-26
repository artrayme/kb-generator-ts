import type { WikiDataContainer } from "../model/WikiDataContainer.js";

export interface WikiPipelineComponent {
  execute: () => Promise<WikiDataContainer>;
}
