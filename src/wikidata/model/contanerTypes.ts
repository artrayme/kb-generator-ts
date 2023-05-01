type SemanticID = string;
type WmLanguageCode = string;
type OstisID = string;
type SemanticTriplet = {
  node1: SemanticID;
  property: SemanticID;
  node2: SemanticID;
};

export type {
  OstisID,
  SemanticID,
  SemanticTriplet,
  WmLanguageCode
};
