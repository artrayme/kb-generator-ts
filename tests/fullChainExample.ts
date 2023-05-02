import {
  BatchEntityCollector,
  ClearIllegalCharactersFromDescription,
  DeleteEntitiesWithInvalidOstisIdtf, DeleteEntitiesWithoutLabels, DeleteEntitiesWithoutTitle,
  DeleteOstisIdDuplicates, EntityDataCollector, FillMappingInfo, InstancesFromConcepts,
  MapWikiToOstisRelationNames,
  PipelineInit, renderConcepts, renderInstances, renderRelations,
  SemanticID,
  WmLanguageCode
} from "../src";

const WBK = require("wikibase-sdk");


const myFun = async () => {
  const wdk = WBK({
    instance: `https://www.wikidata.org`,
    sparqlEndpoint: `https://query.wikidata.org/sparql`
  });
  const languages: WmLanguageCode[] = [`en`, `ru`];
  const initElement = new PipelineInit();
  const mainCollector = new BatchEntityCollector(
    initElement,
    languages,
    wdk,
    new Map([[`human`, `en`], [`Sport`, `en`]]),
    [],
    1,
    1
    //[`Q647268`, `Q771376`, `Q860998`]
  );

  const relationsInstanceOf = new Set<SemanticID>([`P31`, `P106`, `P1855`]);
  const relationsHasInstance = new Set<SemanticID>([`P5869`]);
  const relationsSubclassOf = new Set<SemanticID>([`P279`]);

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

  console.log(result);

  // const x = new BatchEntityCollector([`en`, `ru`], wdk, new Map([[`Sport`, `en`]]), [`P13`]);
};

myFun().then(r => {
});
