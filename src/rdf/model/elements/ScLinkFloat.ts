import type { ScType } from "../types/ScType";
import type { ScLink} from "./ScLink";
import { ScLinkContentType } from "./ScLink";

export class ScLinkFloat implements ScLink {

  constructor(private readonly id: number,
              private readonly type: ScType,
              private readonly _content: number) {
  }

  getId(): number {
    return this.id;
  }

  getLinkContentType(): ScLinkContentType {
    return ScLinkContentType.FLOAT;
  }

  getType(): ScType {
    return this.type;
  }


  get content(): number {
    return this._content;
  }
}
