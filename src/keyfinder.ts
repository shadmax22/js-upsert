export function keyFinder(
  { obj }: any,
  targetKey: any,
  currentKeys = [] as any,
  inner = false
): any {
  let result = [] as any;

  // ITERATING ALL KEYS IN OBJECT

  for (let key in obj) {
    let ThisKeyValue = obj[key];
    if (key.includes(targetKey) && (ThisKeyValue ?? false)) {
      result.push({
        index: [...currentKeys, ...(ThisKeyValue.index ?? [])],
        value: ThisKeyValue.value,
        isFunction: ThisKeyValue.isFunction,
      });
    } else if (typeof ThisKeyValue === "object") {
      const nestedResult = keyFinder(
        { obj: ThisKeyValue },
        targetKey,
        [...currentKeys, key],
        true
      );

      result = result.concat(nestedResult.obj);
    }
  }

  return inner
    ? { obj: result }
    : {
        result,
      };
}
