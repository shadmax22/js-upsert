import deepUpdater from "./deepUpdater";
import { keyFinder } from "./keyfinder";
import { typeParam_upsert } from "../ts/upsert.type";

type configType = {
  returnType?: "object" | "array";
};
export function upserter<HayStackType>(
  haystack: HayStackType,
  needle: any,
  config: configType = { returnType: "object" }
) {
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
}

export function upsert<HayStackType, Needle>(
  haystack: HayStackType,
  ...needles: typeParam_upsert<HayStackType, keyof Needle>[]
): HayStackType {
  let config = {
    returnType: "object",
  } as configType;
  const haystackArrayValidation = Array.isArray(haystack);

  if (haystackArrayValidation) config.returnType = "array"; // IF INITAL VALUE IS ARRAY THEN RETURN IN ARRAY

  for (let needle of needles) {
    upserter(haystack, needle, config);
  }

  try {
    return (
      haystackArrayValidation ? [...haystack] : { ...haystack }
    ) as HayStackType;
  } catch (e) {
    throw Error(
      `Cannot return value as returnType '${config.returnType}'. Please try '${
        config.returnType == "array" ? "OBJECT" : "ARRAY"
      }' returnType, ERROR: RETURN_ERROR.`
    );
  }
}
