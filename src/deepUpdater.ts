export default function deepUpdater(
  data: any,
  index: any,
  value: any,
  isFunction: any = false
) {
  if (index.length <= 1) {
    try {
      if (index.length > 0) {
        data[index[0]] = isFunction ? value(data[index[0] ?? index]) : value;
      } else {
        let _NEW_VALUE = isFunction ? value(data) : value;
        for (const key of Object.keys(_NEW_VALUE)) {
          data[key] = _NEW_VALUE[key];
        }
      }
    } catch (error: any) {
      console.error(`OBJECT KEY INDEX UPADATION FALED: `, error.message);
    }

    return data;
  }

  let NEW_VALUE = (data ?? [])[index[0]] ?? false;

  if (!NEW_VALUE) {
    let N = createObject(index, value, isFunction);

    data[index[0]] = N;

    return data;
  }

  index.shift();
  return deepUpdater(NEW_VALUE, index, value, isFunction);
}

function createObject(index: any, value: any, isFunction: any = false) {
  let CLONED_INDEX = [...index];
  let NEW_OBJ;

  if (CLONED_INDEX.length == 1) NEW_OBJ = isFunction ? value({}) : value;
  else {
    NEW_OBJ = {} as any;
    CLONED_INDEX.shift();
    NEW_OBJ[CLONED_INDEX[0]] = createObject(CLONED_INDEX, value);
  }

  return NEW_OBJ;
}
