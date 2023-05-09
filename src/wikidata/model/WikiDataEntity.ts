import type { SemanticID, WmLanguageCode } from "./contanerTypes";

class WikiDataEntity {
  public constructor(readonly wikiId: SemanticID,
                     readonly title: string,
                     readonly labels: Map<WmLanguageCode, string>,
                     readonly descriptions: Map<WmLanguageCode, string>) {
  }
}

export {
  WikiDataEntity
};
