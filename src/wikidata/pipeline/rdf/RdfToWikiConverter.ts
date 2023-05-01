import { WikiPipelineComponent } from "../../WikiPipelineComponent";
import { WikiDataContainer } from "../../model/WikiDataContainer";
import streamifyString from "streamify-string";
import rdfParserInstance, { RdfParser } from "rdf-parse";
import { SemanticID } from "../../model/contanerTypes";
import { Quad, Quad_Object, Quad_Predicate, Quad_Subject } from "@rdfjs/types/data-model";

export class RdfToWikiConverter implements WikiPipelineComponent {
  private readonly rdfParser: RdfParser;
  private readonly labelProperty = "rdfs:label";
  private readonly descriptionProperty = "rdfs:comment";

  // private readonly subject

  constructor(private readonly wikiProcessorPipeline: WikiPipelineComponent,
              private readonly rdfText: { rdfText: string, contentType: string }[],
              private readonly rdfToWikiProperties: Map<string, SemanticID> = new Map([
                ["rdf:type", "P31"],
                ["rdfs:subClassOf", "P279"],
                ["rdfs:member", "P361"]
              ])
  ) {
    this.rdfParser = rdfParserInstance;
  }

  async execute(): Promise<WikiDataContainer> {
    const container = await this.wikiProcessorPipeline.execute();

    for (let i = 0; i < this.rdfText.length; i++) {
      this.rdfParser.parse(streamifyString(this.rdfText[i].rdfText), { contentType: this.rdfText[i].contentType })
        .on("data", (quad) => this.convert(quad))
        .on("error", (error) => console.error(error))
        .on("end", () => console.log("All done!"));
    }

    return container;
  }

  private convert(quad: Quad) {
    this.processSubject(quad.subject);
    this.processPredicate(quad.predicate);
    this.processObject(quad.object);

  }

  private processSubject(subject: Quad_Subject) {
    const uri = subject.value;

    console.log(`Subject: ${subject}`);
  }

  private processPredicate(predicate: Quad_Predicate) {
    console.log(`Predicate: ${predicate}`);
  }

  private processObject(object: Quad_Object) {
    console.log(`Object: ${object}`);
  }


}
