import type { WikiDataContainer } from "../model/WikiDataContainer";

export interface WikiPipelineComponent {
  execute: () => Promise<WikiDataContainer>;
}
