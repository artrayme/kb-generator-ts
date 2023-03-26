import { renderConcepts, renderInstances, renderRelations } from "../src/scs-templates/ScsTemplateEngine.js";
import type { WikiID } from "../src/wikidata/model/contanerTypes.js";
import {
  ClearIllegalCharactersFromDescription
} from "../src/wikidata/pipeline/ostislayer/ClearIllegalCharactersFromDescription.js";
import {
  DeleteEntitiesWithInvalidOstisIdtf
} from "../src/wikidata/pipeline/ostislayer/DeleteEntitiesWithInvalidOstisIdtf.js";
import { DeleteOstisIdDuplicates } from "../src/wikidata/pipeline/ostislayer/DeleteOstisIdDuplicates.js";
import { FillMappingInfo } from "../src/wikidata/pipeline/ostislayer/FillMappingInfo.js";
import { MapWikiToOstisRelationNames } from "../src/wikidata/pipeline/ostislayer/MapWikiToOstisRelationNames.js";
import { BatchEntityCollector } from "../src/wikidata/pipeline/wikilayer/BatchEntityCollector.js";
import { DeleteEntitiesWithoutLabels } from "../src/wikidata/pipeline/wikilayer/DeleteEntitiesWithoutLabels.js";
import {
  DeleteEntitiesWithoutTitle
} from "../src/wikidata/pipeline/wikilayer/DeleteEntitiesWithoutTitle.js";
import { EntityDataCollector } from "../src/wikidata/pipeline/wikilayer/EntityDataCollector.js";
import { InstancesFromConcepts } from "../src/wikidata/pipeline/wikilayer/InstancesFromConcepts.js";
import { test } from "vitest";
import type { WmLanguageCode } from "wikibase-sdk";
import { WBK } from "wikibase-sdk";

test(`example full chain`, async () => {
  const wdk = WBK({
    instance: `https://www.wikidata.org`,
    sparqlEndpoint: `https://query.wikidata.org/sparql`
  });
  const languages: WmLanguageCode[] = [`en`, `ru`];
  const mainCollector = new BatchEntityCollector(
    languages,
    wdk,
    new Map([[`human`, `en`], [`Sport`, `en`]]),
    [],
    1,
    1
    //[`Q647268`, `Q771376`, `Q860998`]
  );

  const relationsInstanceOf = new Set<WikiID>([`P31`, `P106`, `P1855`]);
  const relationsHasInstance = new Set<WikiID>([`P5869`]);
  const relationsSubclassOf = new Set<WikiID>([`P279`]);

  const pipeline = new ClearIllegalCharactersFromDescription(
    new MapWikiToOstisRelationNames(
      new DeleteEntitiesWithInvalidOstisIdtf(
        new DeleteOstisIdDuplicates(
          new FillMappingInfo(
            new DeleteEntitiesWithoutTitle(
              //new DeleteEntitiesByRelations(
              new DeleteEntitiesWithoutLabels(
                new EntityDataCollector(
                  new InstancesFromConcepts(
                    mainCollector,
                    relationsInstanceOf,
                    relationsHasInstance,
                    relationsSubclassOf
                  ),
                  wdk,
                  languages
                )
                //),
                //new Set([`P2959`])
              )
            )
          )
        )
      ),
      new Map([
        [`P527`, `nrel_basic_decomposition`],
        [`P1552`, `nrel_inclusion`]
      ])
    )
  );
  const resultContainer = await pipeline.execute();

  const renders = renderConcepts(resultContainer);
  const renders2 = renderRelations(resultContainer);
  const renders3 = renderInstances(resultContainer);

  let result = ``;

  renders.forEach((v) => {
    result += v;
  });
  renders2.forEach((v) => {
    result += v;
  });
  renders3.forEach((v) => {
    result += v;
  });

  // const x = new BatchEntityCollector([`en`, `ru`], wdk, new Map([[`Sport`, `en`]]), [`P13`]);
}, 600000);

