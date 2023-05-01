import type { SemanticID, WmLanguageCode } from "./contanerTypes";

class WikiDataEntity {
  public constructor(private readonly _wikiId: SemanticID,
                     private readonly _title: string,
                     private readonly _labels: Map<WmLanguageCode, string>,
                     private readonly _descriptions: Map<WmLanguageCode, string>) {
  }


  get wikiId(): SemanticID {
    return this._wikiId;
  }


  get title(): string {
    return this._title;
  }

  get labels(): Map<WmLanguageCode, string> {
    return this._labels;
  }

  get descriptions(): Map<WmLanguageCode, string> {
    return this._descriptions;
  }
}

export {
  WikiDataEntity
};
