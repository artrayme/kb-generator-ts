import type { ItemId, PropertyId } from "wikibase-sdk";

type WikiID = ItemId | PropertyId;
type OstisID = string;
type WikiTriplet = {
  node1: WikiID;
  property: WikiID;
  node2: WikiID;
};

export type {
  OstisID,
  WikiID,
  WikiTriplet
};
