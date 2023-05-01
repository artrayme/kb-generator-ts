import type { ScElement } from "./ScElement";

export interface ScLink extends ScElement {

  getLinkContentType(): ScLinkContentType;
}

export enum ScLinkContentType {
  STRING,
  INT,
  FLOAT,
}
