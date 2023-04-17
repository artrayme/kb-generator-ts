import { replaceAll } from "../../model/collectionUtils";
import type { WikiDataContainer } from "../../model/WikiDataContainer";
import type { WikiPipelineComponent } from "../WikiPipelineComponent";

export class FillMappingInfo implements WikiPipelineComponent {
  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent) {}

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();
    replaceAll(container.propertiesWikiToOstisMap, (k) => {
      const entity = container.allData.get(k);
      if (!entity) throw Error(`Inconsistency: entity with wiki id ${k} does not exist`)
      return this.toOstisIdtf(entity.title, `nrel_`);
    });
    replaceAll(container.conceptsWikiToOstisMap, (k) => {
      const entity = container.allData.get(k);
      if (!entity) throw Error(`Inconsistency: entity with wiki id ${k} does not exist`)
      return this.toOstisIdtf(entity.title, `concept_`);
    });
    replaceAll(container.instancesWikiToOstisMap, (k) => {
      const entity = container.allData.get(k);
      if (!entity) throw Error(`Inconsistency: entity with wiki id ${k} does not exist`)
      return this.toOstisIdtf(entity.title, ``);
    });
    return container;
  }

  public toOstisIdtf(label: string, prefix: string): string {
    return prefix + label.replaceAll(` `,`_`)
      .replaceAll(`+`, `_`)
      .replaceAll(`-`, `_`)
      .replaceAll(`*`, `_`)
      .replaceAll(`/`, `_`)
      .replaceAll(`.`, `_`)
      .replaceAll(`,`, `_`)
      .replaceAll(`:`, `_`)
      .replaceAll(`;`, `_`)
      .replaceAll(`&`, `_`)
      .replaceAll(`|`, `_`)
      .replaceAll(`@`, `_`)
      .replaceAll(`___`, `_`) // must be after all "to _" replacements
      .replaceAll(`__`, `_`) // also ToDo implement solution with regex
      .replaceAll(`"`, ``)
      .replaceAll(`'`, ``)
      .replaceAll(`[`, ``)
      .replaceAll(`]`, ``)
      .replaceAll(`(`, ``)
      .replaceAll(`)`, ``);
  }
}
