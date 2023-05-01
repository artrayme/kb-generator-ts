import { ScLink, ScLinkContentType } from "./ScLink";
import type { ScType } from "../types/ScType";

export class ScLinkString implements ScLink {

  constructor(private readonly id: number,
              private readonly type: ScType,
              private readonly _content: string) {
  }

  getId(): number {
    return this.id;
  }

  getLinkContentType(): ScLinkContentType {
    return ScLinkContentType.STRING;
  }

  getType(): ScType {
    return this.type;
  }


  get content(): string {
    return this._content;
  }
}
