import { copySet, removeIfArray, removeIfMap, removeIfSet } from "./collectionUtils";
import type { OstisID, SemanticID, SemanticTriplet } from "./contanerTypes";
import type { WikiDataEntity } from "./WikiDataEntity";

export class WikiDataContainer {

  public constructor(private readonly _allData: Map<SemanticID, WikiDataEntity>,
                     private readonly _conceptsWikiToOstisMap: Map<SemanticID, OstisID>,
                     private readonly _propertiesWikiToOstisMap: Map<SemanticID, OstisID>,
                     private readonly _instancesWikiToOstisMap: Map<SemanticID, OstisID>,
                     private readonly _classInstancesMap: Map<SemanticID, Set<SemanticID>>,
                     private readonly _triplets: SemanticTriplet[]) {
  }

  public addInstanceForClass(classWikiId: SemanticID, instancesToAdd: Set<SemanticID>) {
    if (this._classInstancesMap.has(classWikiId)) {
      // @ts-ignore
      instancesToAdd.forEach(e => this._classInstancesMap.get(classWikiId).add(e));
    } else {
      this._classInstancesMap.set(classWikiId, copySet(instancesToAdd));
    }
  }

  public deleteByWikiIds(wikiIds: Set<SemanticID>) {
    removeIfMap(this._conceptsWikiToOstisMap, (k: SemanticID) => wikiIds.has(k));
    removeIfMap(this._instancesWikiToOstisMap, (k: SemanticID) => wikiIds.has(k));
    removeIfMap(this._propertiesWikiToOstisMap, (k: SemanticID) => wikiIds.has(k));
    removeIfMap(this._classInstancesMap, (k: SemanticID) => wikiIds.has(k));
    this._classInstancesMap.forEach(e => {
      removeIfSet(e, (k: SemanticID) => wikiIds.has(k));
    });
    removeIfMap(this._classInstancesMap, (k: SemanticID, v: Set<SemanticID>) => v.size === 0);
    removeIfArray(this._triplets,
      (e: SemanticTriplet) => wikiIds.has(e.node1)
        || wikiIds.has(e.property)
        || wikiIds.has(e.node2)
    );
    removeIfMap(this._allData, (k: SemanticID) => wikiIds.has(k));
  }


  get allData(): Map<SemanticID, WikiDataEntity> {
    return this._allData;
  }

  get conceptsWikiToOstisMap(): Map<SemanticID, OstisID> {
    return this._conceptsWikiToOstisMap;
  }

  get propertiesWikiToOstisMap(): Map<SemanticID, OstisID> {
    return this._propertiesWikiToOstisMap;
  }

  get instancesWikiToOstisMap(): Map<SemanticID, OstisID> {
    return this._instancesWikiToOstisMap;
  }

  get classInstancesMap(): Map<SemanticID, Set<SemanticID>> {
    return this._classInstancesMap;
  }

  get triplets(): SemanticTriplet[] {
    return this._triplets;
  }
}
