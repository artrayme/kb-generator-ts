const copySet = <elementT>(set: Set<elementT>) => {
  const result = new Set<elementT>();
  set.forEach(e => result.add(e));
  return result;
};

const removeIfMap = <keyT, valueT>(map: Map<keyT, valueT>, condition: (key: keyT, value: valueT) => boolean) => {
  const result = new Map<keyT, valueT>();
  map.forEach((v, k) => {
    if (!condition(k, v)) {
      result.set(k, v);
    }
  });
  map.clear();
  result.forEach((v, k) => map.set(k, v));
};

const removeIfSet = <elementT>(set: Set<elementT>, condition: (key: elementT) => boolean) => {
  const result = new Set<elementT>();
  set.forEach((e) => {
    if (!condition(e)) {
      result.add(e);
    }
  });
  set.clear();
  result.forEach((e) => set.add(e));
};
const removeIfArray = <elementT>(arr: elementT[], condition: (key: elementT) => boolean) => {
  const result = new Array<elementT>();
  arr.forEach((e) => {
    if (!condition(e)) {
      result.push(e);
    }
  });
  while (arr.length) {
    arr.pop();
  }
  result.forEach((e) => arr.push(e));
};

const mergeMaps = <keyT, valueT>(sourceMap: Map<keyT, valueT[]>, targetMap: Map<keyT, valueT[]>) => {
  sourceMap.forEach((v, k) => {
    if (targetMap.has(k)) {
      // @ts-ignore
      sourceMap.get(k).forEach(e => {
        // @ts-ignore
        targetMap.get(k).push(e);
      });
    } else {
      const temp: valueT[] = [];
      // @ts-ignore
      sourceMap.get(k).forEach(e => {
        temp.push(e);
      });
      targetMap.set(k, temp);
    }
  });
};

const replaceAll = <KeyT, ValueT>(sourceMap: Map<KeyT, ValueT>, converter: (k: KeyT, v: ValueT) => ValueT) => {
  sourceMap.forEach((v, k) => {
    sourceMap.set(k, converter(k, v));
  });
};

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);


export {
  copySet,
  groupBy,
  mergeMaps,
  removeIfArray,
  removeIfMap,
  removeIfSet,
  replaceAll
};
