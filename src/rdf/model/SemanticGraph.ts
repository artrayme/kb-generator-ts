import type { ScEdge } from "./elements/ScEdge";

export class SemanticGraph{
  private readonly _triplets: ScEdge[] = [];

  public addEdge(edge: ScEdge){
    this._triplets.push(edge);
  }

  get triplets(): ScEdge[] {
    return this._triplets;
  }
}
