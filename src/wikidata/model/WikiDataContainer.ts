import { copySet, removeIfArray, removeIfMap, removeIfSet } from "./collectionUtils.js";
import type { OstisID, WikiID, WikiTriplet } from "./contanerTypes.js";
import type { WikiDataEntity } from "./WikiDataEntity.js";

export class WikiDataContainer {

  public constructor(private readonly _allData: Map<WikiID, WikiDataEntity>,
                     private readonly _conceptsWikiToOstisMap: Map<WikiID, OstisID>,
                     private readonly _propertiesWikiToOstisMap: Map<WikiID, OstisID>,
                     private readonly _instancesWikiToOstisMap: Map<WikiID, OstisID>,
                     private readonly _classInstancesMap: Map<WikiID, Set<WikiID>>,
                     private readonly _triplets: WikiTriplet[]) {
  }

  public addInstanceForClass(classWikiId: WikiID, instancesToAdd: Set<WikiID>) {
    if (this._classInstancesMap.has(classWikiId)) {
      // @ts-ignore
      instancesToAdd.forEach(e => this._classInstancesMap.get(classWikiId).add(e));
    } else {
      this._classInstancesMap.set(classWikiId, copySet(instancesToAdd));
    }
  }

  public deleteByWikiIds(wikiIds: Set<WikiID>) {
    removeIfMap(this._conceptsWikiToOstisMap, (k: WikiID) => wikiIds.has(k));
    removeIfMap(this._instancesWikiToOstisMap, (k: WikiID) => wikiIds.has(k));
    removeIfMap(this._propertiesWikiToOstisMap, (k: WikiID) => wikiIds.has(k));
    removeIfMap(this._classInstancesMap, (k: WikiID) => wikiIds.has(k));
    this._classInstancesMap.forEach(e => {
      removeIfSet(e, (k: WikiID) => wikiIds.has(k));
    });
    removeIfMap(this._classInstancesMap, (k: WikiID, v: Set<WikiID>) => v.size === 0);
    removeIfArray(this._triplets,
      (e: WikiTriplet) => wikiIds.has(e.node1)
        || wikiIds.has(e.property)
        || wikiIds.has(e.node2)
    );
    removeIfMap(this._allData, (k: WikiID) => wikiIds.has(k));
  }


  get allData(): Map<WikiID, WikiDataEntity> {
    return this._allData;
  }

  get conceptsWikiToOstisMap(): Map<WikiID, OstisID> {
    return this._conceptsWikiToOstisMap;
  }

  get propertiesWikiToOstisMap(): Map<WikiID, OstisID> {
    return this._propertiesWikiToOstisMap;
  }

  get instancesWikiToOstisMap(): Map<WikiID, OstisID> {
    return this._instancesWikiToOstisMap;
  }

  get classInstancesMap(): Map<WikiID, Set<WikiID>> {
    return this._classInstancesMap;
  }

  get triplets(): WikiTriplet[] {
    return this._triplets;
  }
}
