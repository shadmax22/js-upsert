export default function deepUpdater(data: any, index: any, value: any) {
  if (index.length == 1) {
    data[index[0]] = value;
    return data;
  }

  let NEW_VALUE = (data ?? [])[index[0]] ?? false;

  if (!NEW_VALUE) {
    let N = createObject(index, value);

    data[index[0]] = N;

    return data;
  }

  index.shift();
  return deepUpdater(NEW_VALUE, index, value);
}

function createObject(index: any, value: any) {
  let CLONED_INDEX = [...index];
  let NEW_OBJ;

  if (CLONED_INDEX.length == 1) NEW_OBJ = value;
  else {
    NEW_OBJ = {} as any;
    CLONED_INDEX.shift();
    NEW_OBJ[CLONED_INDEX[0]] = createObject(CLONED_INDEX, value);
  }

  return NEW_OBJ;
}
