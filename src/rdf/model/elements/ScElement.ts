import type { ScType } from "../types/ScType";

export interface ScElement{
  getId(): number;

  getType(): ScType;
}
