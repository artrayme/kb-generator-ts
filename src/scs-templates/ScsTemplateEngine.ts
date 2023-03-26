import type { OstisID, WikiID } from "../wikidata/model/contanerTypes.js";
import type { WikiDataContainer } from "../wikidata/model/WikiDataContainer.js";
import * as Eta from "eta";

Eta.configure({
  tags: [`$`, `$`]
});

const langDefinitionPrefix = new Map([
  [`en`, `Def`],
  [`de`, `Def`],
  [`fr`, `Def`],
  [`es`, `Def`],
  [`pl`, `Def`],
  [`ru`, `Опр`],
  [`be`, `Выз`],
  [`uk`, `Виз`]
]);

const propertyForSubclass = new Set([`P279`]);

const defaultConceptTemplate = `
$= it.idtf $

=> nrel_main_idtf:
    $ it.labels.forEach(function(label){ $
      [$= label.text $] (*<-$= label.lang $;;*);
    $ }) $

$ if(it.definitions){ $
<- rrel_key_sc_element: ... (*
  <- definition;;
    => nrel_main_idtf:$ it.definitions.forEach(function(definition){ $       
      [$= definition.text $] (*<-$= definition.lang $;;*);$$
$ }) $;
$ if(it.definitionConcepts){ $
    => nrel_using_constants: {$ it.definitionConcepts.forEach(function(definitionConcept){ $

      $= definitionConcept.id $;$$
$ }) $;
    };;
$ } $
$ if( it.examples && it.examples.length !== 0 ){ $
    <= nrel_sc_text_translation: ... (*
      -> rrel_example:$ it.examples.forEach(function(example){ $       
      [$= example.text $] (*<-$= example.lang $;;*);$$
$ }) $;
    *);;
$ } $
*);
$ } $

$ if(it.relations && it.relations.length !== 0){ $
$ it.relations.forEach(function(rel){ $

=> $= rel.id $: $= rel.connected $;$$
$ }); $
$ } $
$ if(it.superclass && it.superclass.length !== 0){ $
$ it.superclass.forEach(function(sclass){ $

<- $= sclass.id $;$$
$ }); $
$ } $

<- sc_node_class;
<- class;
<- sc_node_not_relation;;
`;


const defaultRelationTemplate = `
$= it.idtf $

=> nrel_main_idtf:
    $ it.labels.forEach(function(label){ $
      [$= label.text $] (*<-$= label.lang $;;*);
    $ }) $

$ if(it.definitions){ $
<- rrel_key_sc_element: ... (*
  <- definition;;
    => nrel_main_idtf:$ it.definitions.forEach(function(definition){ $       
      [$= definition.text $] (*<-$= definition.lang $;;*);$$
$ }) $;
$ if(it.definitionConcepts){ $
    => nrel_using_constants: {$ it.definitionConcepts.forEach(function(definitionConcept){ $

      $= definitionConcept.id $;$$
$ }) $;
    };;
$ } $
$ if(it.examples && it.examples.length !== 0){ $
    <= nrel_sc_text_translation: ... (*
      -> rrel_example:$ it.examples.forEach(function(example){ $       
      [$= example.text $] (*<-$= example.lang $;;*);$$
$ }) $;
    *);;
$ } $
*);
$ } $

$ if(it.firstDomains){ $
$ it.firstDomains.forEach(function(concept){ $
=> nrel_first_domain:
  $= concept.id $;
$ }) $
$ } $

$ if(it.secondDomains){ $
$ it.secondDomains.forEach(function(concept){ $
=> nrel_second_domain:
  $= concept.id $;
$ }) $
$ } $

<- sc_node_norole_relation;
<- relation;
<- binary_relation;
<- oriented_relation;
<- antireflexive_relation;
<- asymmetric_relation;
<- antitransitive_relation;;
`;


const defaultInstanceTemplate = `
$= it.idtf $

=> nrel_main_idtf:
    $ it.labels.forEach(function(label){ $
      [$= label.text $] (*<-$= label.lang $;;*);
    $ }) $

$ if(it.definitions){ $
<- rrel_key_sc_element: ... (*
  <- definition;;
    => nrel_main_idtf:$ it.definitions.forEach(function(definition){ $       
      [$= definition.text $] (*<-$= definition.lang $;;*);$$
$ }) $;
$ if(it.definitionConcepts){ $
    => nrel_using_constants: {$ it.definitionConcepts.forEach(function(definitionConcept){ $

      $= definitionConcept.id $;$$
$ }) $;
    };;
$ } $
$ if(it.examples && it.examples.length !== 0){ $
    <= nrel_sc_text_translation: ... (*
      -> rrel_example:$ it.examples.forEach(function(example){ $       
        [$= example.text $] (*<-$= example.lang $;;*);$$
$ }) $;
    *);;
$ } $
*);
$ } $
$ if(it.relations && it.relations.length !== 0){ $
$ it.relations.forEach(function(rel){ $

=> $= rel.id $: $= rel.connected $;$$
$ }); $
$ } $
$ if(it.superclass && it.superclass.length !== 0){ $
$ it.superclass.forEach(function(sclass){ $

<- $= sclass.id $;$$
$ }); $
$ } $

<- sc_node_not_relation;;
`;


export const renderConcepts = (container: WikiDataContainer, template?: string): Map<OstisID, string> => {
  const result = new Map<OstisID, string>();

  container.conceptsWikiToOstisMap.forEach((v, k) => {
    const singleScs = renderSingleConcept(container, k, template);
    result.set(v, singleScs);
  });
  return result;
};

const renderSingleConcept = (container: WikiDataContainer, id: WikiID, template?: string): string => {
  const idtf = container.conceptsWikiToOstisMap.get(id);
  const labels: { text: string | undefined, lang: string | undefined }[] = [];
  const definitions: { text: string | undefined, lang: string | undefined }[] = [];
  const examples: { text: string | undefined, lang: string | undefined }[] = [];
  const relations: { id: string | undefined, connected: string | undefined }[] = [];
  const superclass: { id: string | undefined }[] = [];
  // Not implemented yet
  const definitionConcepts: { id: string }[] | undefined = undefined;

  const currentEntity = container.allData.get(id);
  if (!currentEntity) throw new Error(`Inconsistency found -- entity ${id} cannot be found`);

  currentEntity.labels.forEach((text, lang) => {
    labels.push({ text: text, lang: `lang_${lang}` });
  });

  currentEntity.labels.forEach((text, lang) => {
    if (langDefinitionPrefix.has(lang)) {
      definitions.push({ text: `${langDefinitionPrefix.get(lang)}. (${text})`, lang: `lang_${lang}` });
    } else {
      definitions.push({ text: `Def. (${text})`, lang: `lang_${lang}` });
    }
  });

  currentEntity.descriptions.forEach((text, lang) => {
    examples.push({ text: text, lang: `lang_${lang}` });
  });

  // fill sections with relations (i.e. => nrel_rel: other_concept)
  container.triplets
    .filter(e => e.node1 === id && !propertyForSubclass.has(e.property)) // get only entries with current node and relation is not sub/super class relation
    .forEach(e => {
      // if the connected entity is a concept
      if (container.conceptsWikiToOstisMap.has(e.node2)) {
        relations.push({
          id: container.propertiesWikiToOstisMap.get(e.property),
          connected: container.conceptsWikiToOstisMap.get(e.node2)
        });
      } else {
        //ToDo something more intelligent in case of relation to instance
        relations.push({
          id: container.propertiesWikiToOstisMap.get(e.property),
          connected: container.instancesWikiToOstisMap.get(e.node2)
        });
      }
    });

  container.triplets
    .filter(e => propertyForSubclass.has(e.property) && e.node1 === id)
    .forEach(e => {
      superclass.push({ id: container.conceptsWikiToOstisMap.get(e.node2) });
    });

  return Eta.render(template ? template : defaultConceptTemplate, {
    idtf: idtf,
    labels: labels,
    definitions: definitions,
    examples: examples,
    definitionConcepts: definitionConcepts,
    relations: relations,
    superclass: superclass
  });

};


export const renderRelations = (container: WikiDataContainer, template?: string): Map<OstisID, string> => {
  const result = new Map<OstisID, string>();

  container.propertiesWikiToOstisMap.forEach((v, k) => {
    if (container.allData.has(k)) {
      const singleScs = renderSingleRelation(container, k, template);
      result.set(v, singleScs);
    }
  });

  return result;
};

const renderSingleRelation = (container: WikiDataContainer, id: WikiID, template?: string): string => {
  const idtf = container.propertiesWikiToOstisMap.get(id);
  const labels: { text: string | undefined, lang: string | undefined }[] = [];
  const definitions: { text: string | undefined, lang: string | undefined }[] = [];
  const examples: { text: string | undefined, lang: string | undefined }[] = [];
  const firstDomains: { id: string | undefined }[] = [];
  const secondDomains: { id: string | undefined }[] = [];
  // Not implemented yet
  const definitionConcepts: { id: string }[] | undefined = undefined;

  const currentProperty = container.allData.get(id);
  if (!currentProperty) throw new Error(`Inconsistency found -- entity ${id} cannot be found`);

  currentProperty.labels.forEach((text, lang) => {
    labels.push({ text: text, lang: `lang_${lang}` });
  });

  currentProperty.labels.forEach((text, lang) => {
    if (langDefinitionPrefix.has(lang)) {
      definitions.push({ text: `${langDefinitionPrefix.get(lang)}. (${text})`, lang: `lang_${lang}` });
    } else {
      definitions.push({ text: `Def. (${text})`, lang: `lang_${lang}` });
    }
  });

  currentProperty.descriptions.forEach((text, lang) => {
    examples.push({ text: text, lang: `lang_${lang}` });
  });

  const domain = container.triplets.filter(e => e.property === id);
  const firstDomainsOriginal = domain.map(e => e.node1);
  firstDomainsOriginal
    .filter((n, i) => firstDomainsOriginal.indexOf(n) === i)
    .forEach(e => {
      if (container.conceptsWikiToOstisMap.has(e)) {
        // if the first node is a concept -- just add
        firstDomains.push({ id: container.conceptsWikiToOstisMap.get(e) });
      } else {
        // if the first node is an instance -- add her superclass
        container.classInstancesMap.forEach((v, k) => {
          if (v.has(e)) {
            firstDomains.push({ id: container.conceptsWikiToOstisMap.get(k) });
          }
        });
      }
    });

  const secondDomainsOriginal = domain.map(e => e.node2);
  secondDomainsOriginal
    .filter((n, i) => secondDomainsOriginal.indexOf(n) === i)
    .forEach(e => {
      if (container.conceptsWikiToOstisMap.has(e)) {
        // if the second node is a concept -- just add
        secondDomains.push({ id: container.conceptsWikiToOstisMap.get(e) });
      } else {
        // if the second node is an instance -- add her superclass
        container.classInstancesMap.forEach((v, k) => {
          if (v.has(e)) {
            secondDomains.push({ id: container.conceptsWikiToOstisMap.get(k) });
          }
        });
      }
    });

  return Eta.render(template ? template : defaultRelationTemplate, {
    idtf: idtf,
    labels: labels,
    definitions: definitions,
    examples: examples,
    definitionConcepts: definitionConcepts,
    firstDomains: firstDomains,
    secondDomains: secondDomains
  });
};


export const renderInstances = (container: WikiDataContainer, template?: string): Map<OstisID, string> => {
  const result = new Map<OstisID, string>();

  container.instancesWikiToOstisMap.forEach((v, k) => {
    const singleScs = renderSingleInstance(container, k, template);
    result.set(v, singleScs);
  });
  return result;
};


const renderSingleInstance = (container: WikiDataContainer, id: WikiID, template?: string): string => {
  const idtf = container.instancesWikiToOstisMap.get(id);
  const labels: { text: string | undefined, lang: string | undefined }[] = [];
  const definitions: { text: string | undefined, lang: string | undefined }[] = [];
  const examples: { text: string | undefined, lang: string | undefined }[] = [];
  const relations: { id: string | undefined, connected: string | undefined }[] = [];
  const superclass: { id: string | undefined }[] = [];
  // Not implemented yet
  const definitionConcepts: { id: string }[] | undefined = undefined;

  const currentEntity = container.allData.get(id);
  if (!currentEntity) throw new Error(`Inconsistency found -- entity ${id} cannot be found`);

  currentEntity.labels.forEach((text, lang) => {
    labels.push({ text: text, lang: `lang_${lang}` });
  });

  currentEntity.labels.forEach((text, lang) => {
    if (langDefinitionPrefix.has(lang)) {
      definitions.push({ text: `${langDefinitionPrefix.get(lang)}. (${text})`, lang: `lang_${lang}` });
    } else {
      definitions.push({ text: `Def. (${text})`, lang: `lang_${lang}` });
    }
  });

  currentEntity.descriptions.forEach((text, lang) => {
    examples.push({ text: text, lang: `lang_${lang}` });
  });

  // fill sections with relations (i.e. => nrel_rel: other_concept)
  container.triplets
    .filter(e => e.node1 === id && !propertyForSubclass.has(e.property)) // get only entries with current node and relation is not sub/super class relation
    .forEach(e => {
      // if the connected entity is a concept
      if (container.instancesWikiToOstisMap.has(e.node2)) {
        relations.push({
          id: container.propertiesWikiToOstisMap.get(e.property),
          connected: container.instancesWikiToOstisMap.get(e.node2)
        });
      } else {
        //ToDo something more intelligent in case of relation to concept
        relations.push({
          id: container.propertiesWikiToOstisMap.get(e.property),
          connected: container.conceptsWikiToOstisMap.get(e.node2)
        });
      }
    });

  container.triplets
    .filter(e => propertyForSubclass.has(e.property) && e.node1 === id)
    .forEach(e => {
      superclass.push({ id: container.instancesWikiToOstisMap.get(e.node2) });
    });

  return Eta.render(template ? template : defaultInstanceTemplate, {
    idtf: idtf,
    labels: labels,
    definitions: definitions,
    examples: examples,
    definitionConcepts: definitionConcepts,
    relations: relations,
    superclass: superclass
  });

};

