export default function deepUpdater(
  data: any,
  index: any,
  value: any,
  isFunction: any = false,
  config: any
) {
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
        throw `Unable to set value at index [${index}], ERROR: SETTER_FAILED`;
      }
    }

    if (data === null || typeof data != "object") {
      throw Error(
        "Initial value is not a object, ERROR: INITITAL_VALUE_PARSE_FAILED"
      );
    }

    let _NEW_VALUE = isFunction ? value(data) : value;

    if (config.returnType == "array") {
      data[0] = _NEW_VALUE;

      return data;
    }

    if (typeof _NEW_VALUE != "object")
      throw `Only object or array can be setted as a default value. Value given ${_NEW_VALUE}.`;

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
      throw `Unable to set value at index [${index}], ERROR: SETTER_FAILED`;
    }

    return data;
  }

  index.shift();
  return deepUpdater(NEW_VALUE, index, value, isFunction, config);
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
