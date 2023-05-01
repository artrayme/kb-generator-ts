import { ScLink, ScLinkContentType } from "./ScLink";
import { ScType } from "../types/ScType";

export class ScLinkInt implements ScLink {

  constructor(private readonly id: number,
              private readonly type: ScType,
              private readonly _content: number) {
  }

  getId(): number {
    return this.id;
  }

  getLinkContentType(): ScLinkContentType {
    return ScLinkContentType.INT;
  }

  getType(): ScType {
    return this.type;
  }


  get content(): number {
    return this._content;
  }
}
