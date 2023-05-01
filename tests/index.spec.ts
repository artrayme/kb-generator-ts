import { renderConcepts, renderInstances, renderRelations } from "../src/wikidata/scs-templates/ScsTemplateEngine.js";
import type { SemanticID, WmLanguageCode } from "../src/wikidata/model/contanerTypes.js";
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
import streamifyString from "streamify-string";

const WBK = require("wikibase-sdk");

test(`example full chain`, async () => {
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
}, 600000);

import rdfParserInstance, { RdfParser } from "rdf-parse";

test("hehe", () => {
  const rdfContent = `<?xml version="1.0"?>
    <rdf:RDF
    xmlns="http://www.metaphacts.com/resource/"
    xmlns:rdfs="http://www.w3.org/2000/01/rdf-shema#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about="http://test#a">
      <name>Belarus</name>
      <Coutry.Capital rdf:resource="http://test#c"/>
      <rdf:type rdf:resource="http://test#Country"/>
      </rdf:Description>
      
      <rdf:Description rdf:about="http://test#c">
      <rdf:type rdf:resource="http://test#City"/>
      <name>Minsk</name>
      </rdf:Description>
      </rdf:RDF>
    `;

  const rdfContent2 =
    `<?xml version="1.0" encoding="UTF-8"?><rdf:RDF xmlns:geospecies="http://rdf.geospecies.org/ont/geospecies#" xmlns:seo="http://www.taxonconcept.org/ont/se_v01/seo.owl#" xmlns:skos="http://www.w3.org/2004/02/skos/core#" xmlns:foaf="http://xmlns.com/foaf/0.1/" xmlns:dbpedia-owl="http://dbpedia.org/ontology/" xmlns:bibo="http://purl.org/ontology/bibo/" xmlns:umbel="http://umbel.org/umbel#" xmlns:ctag="http://commontag.org/ns#" xmlns:v="http://rdf.data-vocabulary.org/" xmlns:cc="http://creativecommons.org/ns#" xmlns:uniprot="http://purl.uniprot.org/core/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:owl="http://www.w3.org/2002/07/owl#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:Description rdf:about="http://lod.geospecies.org/kingdoms/Ah.rdf"><dcterms:title>About: Kingdom Viruses</dcterms:title><dcterms:publisher rdf:resource="http://rdf.geospecies.org/ont/geospecies#GeoSpecies_Knowledge_Base_Project"/><dcterms:creator rdf:resource="http://rdf.geospecies.org/ont/people.owl#Peter_J_DeVries"/><dcterms:description>GeoSpecies Database: Kingdom RDF DescriptionViruses</dcterms:description><dcterms:identifier>http://lod.geospecies.org/kingdoms/Ah.rdf</dcterms:identifier><dcterms:language>en</dcterms:language><dcterms:isPartOf rdf:resource="http://lod.geospecies.org/ontology/void#this"/><dcterms:modified>2013-06-03T03:50:20-0500</dcterms:modified><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/3.0/us/"/><cc:attributionURL rdf:resource="http://lod.geospecies.org"/><cc:attributionName>Peter J. DeVries</cc:attributionName><cc:morePermissions rdf:resource="http://about.geospecies.org/projects/"/><foaf:primaryTopic rdf:resource="http://lod.geospecies.org/kingdoms/Ah"/><foaf:topic rdf:resource="http://lod.geospecies.org/kingdoms/Ah.xhtml"/><foaf:topic rdf:resource="http://lod.geospecies.org/kingdoms/Ah.rdf"/><foaf:topic rdf:resource="http://bio2rdf.org/taxon:10239"/><foaf:topic rdf:resource="urn:lsid:ubio.org:namebank:1769426"/><foaf:topic rdf:resource="http://dbpedia.org/resource/Virus"/><foaf:topic rdf:resource="urn:lsid:catalogueoflife.org:taxon:d7656902-29c1-102b-9a4a-00304854f820:ac2009"/><foaf:topic rdf:resource="http://sw.opencyc.org/concept/Mx4rvViXQpwpEbGdrcN5Y29ycA"/></rdf:Description><geospecies:KingdomConcept rdf:about="http://lod.geospecies.org/kingdoms/Ah"><dcterms:title>Kingdom Viruses</dcterms:title><dcterms:modified>2013-06-03T03:50:20-0500</dcterms:modified><dcterms:publisher rdf:resource="http://rdf.geospecies.org/ont/geospecies#GeoSpecies_Knowledge_Base_Project"/><dcterms:creator rdf:resource="http://rdf.geospecies.org/ont/people.owl#Peter_J_DeVries"/><dcterms:description>GeoSpecies Knowledge Base: Kingdom RDF DescriptionViruses</dcterms:description><dcterms:identifier>http://lod.geospecies.org/kingdoms/Ah</dcterms:identifier><dcterms:isPartOf rdf:resource="http://lod.geospecies.org/ontology/void#this"/><dcterms:modified>2013-06-03T03:50:20-0500</dcterms:modified><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/3.0/us/"/><cc:attributionURL rdf:resource="http://lod.geospecies.org"/><cc:attributionName>Peter J. DeVries</cc:attributionName><foaf:primaryTopic rdf:resource="http://lod.geospecies.org/kingdoms/Ah"/><foaf:topic rdf:resource="http://lod.geospecies.org/kingdoms/Ah.xhtml"/><foaf:topic rdf:resource="http://lod.geospecies.org/kingdoms/Ah.rdf"/><skos:prefLabel>Viruses</skos:prefLabel><skos:altLabel>Viruses</skos:altLabel><uniprot:rank rdf:resource="http://purl.uniprot.org/core/Kingdom"/><umbel:isAligned rdf:resource="http://umbel.org/umbel/sc/Virus"/><geospecies:hasGeoSpeciesPage rdf:resource="http://lod.geospecies.org/kingdoms/Ah.xhtml"/><foaf:isPrimaryTopicOf rdf:resource="http://lod.geospecies.org/kingdoms/Ah.xhtml"/><foaf:isPrimaryTopicOf rdf:resource="http://lod.geospecies.org/kingdoms/Ah.rdf"/><geospecies:hasKingdomName>Viruses</geospecies:hasKingdomName><geospecies:hasCommonName>Viruses</geospecies:hasCommonName><geospecies:relatedMatch rdf:resource="urn:lsid:ubio.org:namebank:1769426"/><geospecies:closeMatch rdf:resource="urn:lsid:catalogueoflife.org:taxon:d7656902-29c1-102b-9a4a-00304854f820:ac2009"/><skos:closeMatch rdf:resource="http://bio2rdf.org/taxon:10239"/><rdfs:seeAlso rdf:resource="http://bio2rdf.org/taxon:10239"/><skos:closeMatch rdf:resource="http://dbpedia.org/resource/Virus"/><rdfs:seeAlso rdf:resource="http://dbpedia/data/http://dbpedia.org/resource/Virus.rdf"/><skos:closeMatch rdf:resource="http://sw.opencyc.org/concept/Mx4rvViXQpwpEbGdrcN5Y29ycA"/><rdfs:seeAlso rdf:resource="http://sw.opencyc.org/concept/Mx4rvViXQpwpEbGdrcN5Y29ycA"/><geospecies:hasITIS>630577</geospecies:hasITIS><geospecies:hasGBIF>13140809</geospecies:hasGBIF><geospecies:hasEOL>5006</geospecies:hasEOL><geospecies:hasWikipediaArticle rdf:resource="http://en.wikipedia.org/wiki/Virus"/><foaf:page rdf:resource="http://en.wikipedia.org/wiki/Virus"/><geospecies:hasWikispeciesArticle rdf:resource="http://species.wikimedia.org/wiki/Virus"/><foaf:page rdf:resource="http://species.wikimedia.org/wiki/Virus"/><foaf:page rdf:resource="http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&amp;search_value=630577"/><foaf:page rdf:resource="http://data.gbif.org/species/13140809"/><foaf:page rdf:resource="http://tolweb.org/Viruses"/><foaf:page rdf:resource="http://www.biolib.cz/en/taxon/id14776"/></geospecies:KingdomConcept><geospecies:Bio2RDFtaxon rdf:about="http://bio2rdf.org/taxon:10239"><skos:closeMatch rdf:resource="http://lod.geospecies.org/kingdoms/Ah"/></geospecies:Bio2RDFtaxon><geospecies:Ubio_LSID rdf:about="urn:lsid:ubio.org:namebank:1769426"><skos:relatedMatch rdf:resource="http://lod.geospecies.org/kingdoms/Ah"/></geospecies:Ubio_LSID><geospecies:CoL_LSID rdf:about="urn:lsid:catalogueoflife.org:taxon:d7656902-29c1-102b-9a4a-00304854f820:ac2009"><skos:closeMatch rdf:resource="http://lod.geospecies.org/kingdoms/Ah"/></geospecies:CoL_LSID><geospecies:DBpediaResource rdf:about="http://dbpedia.org/resource/Virus"><skos:closeMatch rdf:resource="http://lod.geospecies.org/kingdoms/Ah"/></geospecies:DBpediaResource><geospecies:OpenCycConcept rdf:about="http://sw.opencyc.org/concept/Mx4rvViXQpwpEbGdrcN5Y29ycA"><skos:closeMatch rdf:resource="http://lod.geospecies.org/kingdoms/Ah"/></geospecies:OpenCycConcept></rdf:RDF>`;

  const x = streamifyString(rdfContent);
  const textStream = streamifyString(rdfContent2);

  // console.log(await rdfParserInstance.getContentTypes());
  // console.log(x2)
  const readableStream = rdfParserInstance.parse(textStream, { contentType: "application/rdf+xml" });
  readableStream.on("data", () => console.log("DATA"));
  readableStream.on("end", () => console.log("END"));
  // y.emit("end");


  // console.log(y)
  // await y;
  // console.log(y.read());
  // y.pipe()
  // console.log(y)
  console.log("qwe");

//   const textStream = require('streamify-string')(`
// <http://ex.org/s> <http://ex.org/p> <http://ex.org/o1>, <http://ex.org/o2>.
// `);
//
//   rdfParserInstance.parse(textStream, { contentType: 'text/turtle', baseIRI: 'http://example.org' })
//     .on('data', (quad) => console.log(quad))
//     .on('error', (error) => console.error(error))
//     .on('end', () => console.log('All done!'));
//
//   // console.log(y._events.data)
});

import { RdfXmlParser } from "rdfxml-streaming-parser";
import * as fs from "fs";
import { PipelineInit } from "../src/wikidata/pipeline/PipelineInit";
import { RdfToWikiConverter } from "../src/wikidata/pipeline/rdf/RdfToWikiConverter";

test("other", () => {
  const rdfParser = require("rdf-parse").default;
  const fs = require("fs");

  const input = fs.createReadStream("data.rdf");
  const output = rdfParser.parse(input, { contentType: "application/rdf+xml" });

  output.on("data", quad => {
    console.log(quad.subject.value, quad.predicate.value, quad.object.value);
  });

  output.on("end", () => {
    console.log("Parsing complete!");
  });

});
