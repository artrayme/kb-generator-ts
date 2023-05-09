import { copySet, removeIfArray, removeIfMap, removeIfSet } from "./collectionUtils";
import type { OstisID, SemanticID, SemanticTriplet } from "./contanerTypes";
import type { WikiDataEntity } from "./WikiDataEntity";

export class WikiDataContainer {

  public constructor(readonly allData: Map<SemanticID, WikiDataEntity>,
                     readonly conceptsWikiToOstisMap: Map<SemanticID, OstisID>,
                     readonly propertiesWikiToOstisMap: Map<SemanticID, OstisID>,
                     readonly instancesWikiToOstisMap: Map<SemanticID, OstisID>,
                     readonly classInstancesMap: Map<SemanticID, Set<SemanticID>>,
                     readonly triplets: SemanticTriplet[]) {
  }

  public addInstanceForClass(classWikiId: SemanticID, instancesToAdd: Set<SemanticID>) {
    if (this.classInstancesMap.has(classWikiId)) {
      // @ts-ignore
      instancesToAdd.forEach(e => this.classInstancesMap.get(classWikiId).add(e));
    } else {
      this.classInstancesMap.set(classWikiId, copySet(instancesToAdd));
    }
  }

  public deleteByWikiIds(wikiIds: Set<SemanticID>) {
    removeIfMap(this.conceptsWikiToOstisMap, (k: SemanticID) => wikiIds.has(k));
    removeIfMap(this.instancesWikiToOstisMap, (k: SemanticID) => wikiIds.has(k));
    removeIfMap(this.propertiesWikiToOstisMap, (k: SemanticID) => wikiIds.has(k));
    removeIfMap(this.classInstancesMap, (k: SemanticID) => wikiIds.has(k));
    this.classInstancesMap.forEach(e => {
      removeIfSet(e, (k: SemanticID) => wikiIds.has(k));
    });
    removeIfMap(this.classInstancesMap, (k: SemanticID, v: Set<SemanticID>) => v.size === 0);
    removeIfArray(this.triplets,
      (e: SemanticTriplet) => wikiIds.has(e.node1)
        || wikiIds.has(e.property)
        || wikiIds.has(e.node2)
    );
    removeIfMap(this.allData, (k: SemanticID) => wikiIds.has(k));
  }

}
