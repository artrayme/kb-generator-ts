import type { ScType } from "../types/ScType";
import type { ScElement } from "./ScElement";

export class ScEdge implements ScElement {

  constructor(private readonly id: number,
              private readonly type: ScType,
              private readonly _firstElement: ScElement,
              private readonly _secondElement: ScElement) {
  }

  getId(): number {
    return this.id;
  }

  getType(): ScType {
    return this.type;
  }

  get firstElement(): ScElement {
    return this._firstElement;
  }

  get secondElement(): ScElement {
    return this._secondElement;
  }
}
