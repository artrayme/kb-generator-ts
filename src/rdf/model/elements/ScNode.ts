import type { ScElement } from "./ScElement";
import { ScType } from "../types/ScType";

export class ScNode implements ScElement{

  constructor(private readonly id: number,
              private readonly type: ScType) {
  }

  getId(): number {
    return this.id;
  }

  getType(): ScType {
    return this.type;
  }
}
