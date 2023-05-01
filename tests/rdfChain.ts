import { RdfToWikiConverter } from "../src/wikidata/pipeline/rdf/RdfToWikiConverter";
import { PipelineInit } from "../src/wikidata/pipeline/PipelineInit";

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

const rdfBigContent = `<?xml version="1.0" encoding="ISO-8859-1"?>
<rdf:RDF xmlns:ns0="http://cohse.semanticweb.org/ontologies/people#"
    xmlns:owl="http://www.w3.org/2002/07/owl#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:xsd="http://www.w3.org/2001/XMLSchema#">
    <owl:Ontology rdf:about=""/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#white+van+man">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#man"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#drives"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:intersectionOf rdf:parseType="Collection">
                                    <owl:Restriction>
                                    <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+colour"/>
                                    <owl:someValuesFrom>
                                    <owl:Class>
                                    <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#white"/>
                                    </owl:oneOf>
                                    </owl:Class>
                                    </owl:someValuesFrom>
                                    </owl:Restriction>
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#van"/>
                                </owl:intersectionOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#publication"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#giraffe">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#eats"/>
                <owl:allValuesFrom>
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#leaf"/>
                </owl:allValuesFrom>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cat+liker">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#likes"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cat"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cat+owner">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+pet"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cat"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#grownup">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#adult"/>
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#elderly"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#quality+broadsheet">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#broadsheet"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#newspaper">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#publication"/>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Class>
                <owl:unionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#broadsheet"/>
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tabloid"/>
                </owl:unionOf>
            </owl:Class>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bus+company">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#company"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#pet+owner">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+pet"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#mad+cow">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cow"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#eats"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:intersectionOf rdf:parseType="Collection">
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#brain"/>
                                    <owl:Restriction>
                                    <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
                                    <owl:someValuesFrom>
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#sheep"/>
                                    </owl:someValuesFrom>
                                    </owl:Restriction>
                                </owl:intersectionOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#boy">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#sex"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#male"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#young"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bus">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#car">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cat">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cow">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vegetarian"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#dog">
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#eats"/>
                <owl:someValuesFrom>
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bone"/>
                </owl:someValuesFrom>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#kid">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#young"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#man">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#sex"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#male"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#adult"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#van">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#company"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#red+top">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tabloid"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bone"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#girl">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#sex"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#female"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#young"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#leaf">
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
                <owl:someValuesFrom>
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tree"/>
                </owl:someValuesFrom>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tree">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#plant"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#broadsheet">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#newspaper"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#haulage+worker">
        <owl:equivalentClass>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#works+for"/>
                <owl:someValuesFrom>
                    <owl:Class>
                        <owl:unionOf rdf:parseType="Collection">
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#haulage+company"/>
                            <owl:Restriction>
                                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
                                <owl:someValuesFrom>
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#haulage+company"/>
                                </owl:someValuesFrom>
                            </owl:Restriction>
                        </owl:unionOf>
                    </owl:Class>
                </owl:someValuesFrom>
            </owl:Restriction>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#haulage+truck+driver">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#drives"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#truck"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#works+for"/>
                        <owl:someValuesFrom>
                            <owl:Restriction>
                                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
                                <owl:someValuesFrom>
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#haulage+company"/>
                                </owl:someValuesFrom>
                            </owl:Restriction>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bus+driver">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#drives"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bus"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vegetarian">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#eats"/>
                        <owl:allValuesFrom>
                            <owl:Class>
                                <owl:complementOf>
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
                                </owl:complementOf>
                            </owl:Class>
                        </owl:allValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#eats"/>
                        <owl:allValuesFrom>
                            <owl:Class>
                                <owl:complementOf>
                                    <owl:Restriction>
                                    <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
                                    <owl:someValuesFrom>
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
                                    </owl:someValuesFrom>
                                    </owl:Restriction>
                                </owl:complementOf>
                            </owl:Class>
                        </owl:allValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal+lover">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+pet"/>
                        <owl:minCardinality rdf:datatype="http://www.w3.org/2001/XMLSchema#nonNegativeInteger">3</owl:minCardinality>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#dog+liker">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#likes"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#dog"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#dog+owner">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+pet"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#dog"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tabloid">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#newspaper"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#lorry+driver">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#drives"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#lorry"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal">
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#eats"/>
                <owl:someValuesFrom>
                    <owl:Class rdf:about="http://www.w3.org/2002/07/owl#Thing"/>
                </owl:someValuesFrom>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#colour"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#driver">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#drives"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#brain"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#grass">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#plant"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#lorry">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#plant"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#sheep">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#eats"/>
                <owl:allValuesFrom>
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#grass"/>
                </owl:allValuesFrom>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#truck">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#woman">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#adult"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#sex"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#female"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#haulage+company"/>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#magazine">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#publication"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#old+lady">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#elderly"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#sex"/>
                        <owl:someValuesFrom>
                            <owl:Class>
                                <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#female"/>
                                </owl:oneOf>
                            </owl:Class>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#van+driver">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#drives"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#van"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bicycle">
        <rdfs:subClassOf>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#vehicle"/>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#has+pet"/>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#age">
        <rdfs:range>
            <owl:Class>
                <owl:oneOf rdf:parseType="Collection">
                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#young"/>
                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#adult"/>
                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#elderly"/>
                </owl:oneOf>
            </owl:Class>
        </rdfs:range>
    </owl:ObjectProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#sex">
        <rdfs:range>
            <owl:Class>
                <owl:oneOf rdf:parseType="Collection">
                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#male"/>
                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#female"/>
                </owl:oneOf>
            </owl:Class>
        </rdfs:range>
    </owl:ObjectProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#eats">
        <owl:inverseOf rdf:resource="http://cohse.semanticweb.org/ontologies/people#eaten+by"/>
        <rdfs:domain>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
        </rdfs:domain>
    </owl:ObjectProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#works+for"/>
    <owl:DatatypeProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#service_number">
        <rdfs:range rdf:resource="http://www.w3.org/2001/XMLSchema#integer"/>
    </owl:DatatypeProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#has+colour"/>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#has+father">
        <rdfs:subPropertyOf rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+parent"/>
        <rdfs:range>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#man"/>
        </rdfs:range>
    </owl:ObjectProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#eaten+by"/>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#has+mother">
        <rdfs:subPropertyOf rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+parent"/>
        <rdfs:range>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#woman"/>
        </rdfs:range>
    </owl:ObjectProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#has+parent">
        <rdfs:domain>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
        </rdfs:domain>
        <rdfs:range>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
        </rdfs:range>
    </owl:ObjectProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#drives"/>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#has+child"/>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#likes"/>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#reads">
        <rdfs:range>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#publication"/>
        </rdfs:range>
    </owl:ObjectProperty>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#part+of"/>
    <owl:ObjectProperty rdf:about="http://cohse.semanticweb.org/ontologies/people#has+part">
        <owl:inverseOf rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
    </owl:ObjectProperty>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bus+driver">
        <rdfs:subClassOf>
            <owl:Class>
                <owl:unionOf rdf:parseType="Collection">
                    <owl:Class>
                        <owl:complementOf>
                            <owl:Restriction>
                                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#likes"/>
                                <owl:someValuesFrom>
                                    <owl:Class>
                                    <owl:intersectionOf rdf:parseType="Collection">
                                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#person"/>
                                    <owl:Restriction>
                                    <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#age"/>
                                    <owl:someValuesFrom>
                                    <owl:Class>
                                    <owl:oneOf rdf:parseType="Collection">
                                    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#young"/>
                                    </owl:oneOf>
                                    </owl:Class>
                                    </owl:someValuesFrom>
                                    </owl:Restriction>
                                    </owl:intersectionOf>
                                    </owl:Class>
                                </owl:someValuesFrom>
                            </owl:Restriction>
                        </owl:complementOf>
                    </owl:Class>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#reads"/>
                        <owl:allValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#broadsheet"/>
                        </owl:allValuesFrom>
                    </owl:Restriction>
                </owl:unionOf>
            </owl:Class>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#old+lady">
        <rdfs:subClassOf>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+pet"/>
                        <owl:allValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cat"/>
                        </owl:allValuesFrom>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#has+pet"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#white+van+man">
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#reads"/>
                <owl:allValuesFrom>
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tabloid"/>
                </owl:allValuesFrom>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#dog">
        <owl:disjointWith>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#cat"/>
        </owl:disjointWith>
    </owl:Class>
    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#broadsheet">
        <owl:disjointWith>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tabloid"/>
        </owl:disjointWith>
    </owl:Class>
    <owl:Class>
        <owl:unionOf rdf:parseType="Collection">
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
                <owl:someValuesFrom>
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#animal"/>
                </owl:someValuesFrom>
            </owl:Restriction>
        </owl:unionOf>
        <owl:disjointWith>
            <owl:Class>
                <owl:unionOf rdf:parseType="Collection">
                    <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#plant"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="http://cohse.semanticweb.org/ontologies/people#part+of"/>
                        <owl:someValuesFrom>
                            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#plant"/>
                        </owl:someValuesFrom>
                    </owl:Restriction>
                </owl:unionOf>
            </owl:Class>
        </owl:disjointWith>
    </owl:Class>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#TheTimes">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#broadsheet"/>
        </rdf:type>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#red">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#colour"/>
        </rdf:type>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#blue">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#colour"/>
        </rdf:type>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#male">
        <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#Thing"/>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#TheMirror">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tabloid"/>
        </rdf:type>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#TheGuardian">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#broadsheet"/>
        </rdf:type>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#TheSun">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#tabloid"/>
        </rdf:type>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#elderly">
        <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#Thing"/>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#female">
        <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#Thing"/>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#The42">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#bus"/>
        </rdf:type>
        <ns0:service_number rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">42</ns0:service_number>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#adult">
        <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#Thing"/>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#white">
        <rdf:type>
            <owl:Class rdf:about="http://cohse.semanticweb.org/ontologies/people#colour"/>
        </rdf:type>
    </owl:Thing>
    <owl:Thing rdf:about="http://cohse.semanticweb.org/ontologies/people#young">
        <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#Thing"/>
    </owl:Thing>
</rdf:RDF>`;



const pipeline = new RdfToWikiConverter(
  new PipelineInit(),
  [{ rdfText: rdfBigContent, contentType: "application/rdf+xml" }]
);
console.log("qwe");
pipeline.execute();
