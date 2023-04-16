type WikiID = string;
type WmLanguageCode = string;
type OstisID = string;
type WikiTriplet = {
  node1: WikiID;
  property: WikiID;
  node2: WikiID;
};

export type {
  OstisID,
  WikiID,
  WikiTriplet,
  WmLanguageCode
};
