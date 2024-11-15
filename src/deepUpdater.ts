export default function deepUpdater(
  data: any,
  index: any,
  value: any,
  isFunction: any = false,
  config: any,
  drilled: any = []
) {
  const orignal_index = index;

  if (index.length <= 1) {
    /* 
      
      IF INDEX IS PRESENT TO SET:-

      ex:- 
        INDEX: [1]
        DATA: {}

        THEN: DATA = {1: VALUE}

      */

    if (index.length > 0) {
      try {
        data[index[0]] = isFunction ? value(data[index[0] ?? index]) : value;

        return data;
      } catch (e) {
        throw `Setting Failed at index ${index[0]} of [${drilled.join(
          " => "
        )}] due to the type ${typeof data}, Only array or object is assignable`;
      }
    }

    if (data === null || typeof data != "object") {
      throw Error(
        "Initial value is not a object, ERROR: INITITAL_VALUE_PARSE_FAILED"
      );
    }

    let _NEW_VALUE = isFunction ? value(data) : value;

    if (config.returnType == "array") {
      data.push(_NEW_VALUE);

      return data;
    }

    if (typeof _NEW_VALUE != "object")
      throw `Object or array can be setted only as a default value. Type of value is ${typeof _NEW_VALUE}.`;

    for (const key of Object.keys(_NEW_VALUE)) {
      data[key] = _NEW_VALUE[key];
    }

    return data;
  }

  let NEW_VALUE = (data ?? [])[index[0]] ?? false;

  if (!NEW_VALUE) {
    let N = createObject(index, value, isFunction);

    try {
      data[index[0]] = N;
    } catch (e) {
      throw `Setting Failed at index ${index[0]} of [${drilled.join(
        " => "
      )}] due to the type ${typeof data}, Only array or object is assignable`;
    }

    return data;
  }

  index.shift();
  return deepUpdater(NEW_VALUE, index, value, isFunction, config, [
    ...drilled,
    orignal_index[0],
  ]);
}

function createObject(index: any, value: any, isFunction: any = false) {
  let CLONED_INDEX = [...index];
  let NEW_OBJ;

  if (CLONED_INDEX.length == 1) NEW_OBJ = isFunction ? value(null) : value;
  else {
    NEW_OBJ = {} as any;
    CLONED_INDEX.shift();
    NEW_OBJ[CLONED_INDEX[0]] = createObject(CLONED_INDEX, value, isFunction);
  }

  return NEW_OBJ;
}
