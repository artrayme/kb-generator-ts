import * as Lib from "../src/index.js";
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
import type { AxiosResponse } from "axios";
import axios from "axios";
import { writeFileSync } from "fs";
import { expect, test } from "vitest";
import { WBK} from "wikibase-sdk";
import type { WmLanguageCode } from "wikibase-sdk";
import type { WbGetEntitiesResponse } from "wikibase-sdk/dist/helpers/parse_responses";
import type { ItemId } from "wikibase-sdk/src/types/entity";

test(`imports using paths config works relative`, async () => {
  const wdk = WBK({
    instance: `https://www.wikidata.org`,
    sparqlEndpoint: `https://query.wikidata.org/sparql`
  });

  const ids: ItemId[] = [`Q647268`, `Q771376`, `Q860998`, `Q965704`];
  const url = wdk.getEntities({
    ids: ids,
    languages: [`en`, `ru`]
  });
  // const axios = require('axios'); // legacy way

  await axios.get(url)
    .then(function(response: AxiosResponse<WbGetEntitiesResponse>) {
      // handle success
      console.log(response.data.entities[`Q647268`]);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
      console.log(`Errorrrrr`);
    });


  expect(Lib.todo()).toEqual(`nothing`);
});

test(`Batch data collector`, async () => {
  const wdk = WBK({
    instance: `https://www.wikidata.org`,
    sparqlEndpoint: `https://query.wikidata.org/sparql`
  });

  const x = new BatchEntityCollector([`en`, `ru`], wdk, new Map([[`human`, `en`], [`Sport`, `en`]]), [`Q647268`, `Q771376`, `Q860998`]);
  // const x = new BatchEntityCollector([`en`, `ru`], wdk, new Map([[`Sport`, `en`]]), [`P13`]);
  const res = await x.execute();
});

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

  let result = ``

  renders.forEach((v) => {
    result += v
  });
  renders2.forEach((v) => {
    result += v
  });
  renders3.forEach((v) => {
    result += v
  });

  writeFileSync(`result.scs`, result, {
    flag: `w`,
  });

  // const x = new BatchEntityCollector([`en`, `ru`], wdk, new Map([[`Sport`, `en`]]), [`P13`]);
}, 600000);


test(`save`, async () => {

});
