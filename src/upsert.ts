import { keyFinder } from "./keyfinder";
import deepUpdater from "./deepUpdater";
export function upsert(
  haystack: any,
  needle: any,
  config: {
    returnType?: "object" | "array";
  } = { returnType: "object" }
) {
  if (Array.isArray(haystack)) config.returnType = "array"; // IF INITAL VALUE IS ARRAY THEN RETURN IN ARRAY
  let { result } = keyFinder({ obj: needle }, "$$@@@@__upsert_hook");

  for (let key = 0; key < result.length; key++) {
    let ThisKey = result[key];

    deepUpdater(
      haystack,
      ThisKey.index,
      ThisKey.value,
      ThisKey.isFunction,
      config
    );
  }

  try {
    return (config?.returnType ?? "object") == "object"
      ? { ...haystack }
      : [...haystack];
  } catch (e) {
    throw Error(
      `Cannot return value as returnType '${config.returnType}'. Please try '${
        config.returnType == "array" ? "OBJECT" : "ARRAY"
      }' returnType, ERROR: RETURN_ERROR.`
    );
  }
}
