import deepUpdater from "./deepUpdater";
import { keyFinder } from "./keyfinder";
import { typeParam_upsert } from "./types/upsert.type";

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

type UpsertType<HayStackType> = {
  (
    haystack: HayStackType,
    ...needles: typeParam_upsert<HayStackType>[]
  ): HayStackType; // The function itself
} & HayStackType & {
    at: (...keys: [...(string | number)[], any]) => UpsertType<HayStackType>; // The `at` method
    get: () => HayStackType; // The `at` method
  };

export function upsert<HayStackType>(
  haystack: HayStackType,
  ...needles: typeParam_upsert<HayStackType>[]
): UpsertType<HayStackType> {
  let config = {
    returnType: "object",
  } as configType;
  const haystackArrayValidation = Array.isArray(haystack);

  if (haystackArrayValidation) config.returnType = "array"; // IF INITAL VALUE IS ARRAY THEN RETURN IN ARRAY

  for (let needle of needles) {
    upserter(haystack, needle, config);
  }

  try {
    return new Proxy(haystack as any, {
      get(target, prop, receiver) {
        target = haystackArrayValidation ? [...haystack] : { ...haystack }; // set updated data

        // If at is given as props

        if (prop === "get") {
          return () => {
            return receiver;
          };
        }
        if (prop === "at") {
          return (...keys: string[]) => {
            if (keys.length <= 1) {
              throw `keys.length is less than 2, need atleast 2 values to differentiate index and value`;
            }
            const value_provided = keys[keys.length - 1];

            const index_provided = keys;
            index_provided.pop();

            deepUpdater(
              haystack,
              index_provided,
              value_provided,
              typeof value_provided == "function",
              config
            );
            return receiver; // default behavior
          };
        }
        return Reflect.get(target, prop, receiver); // default behavior
      },
    }) as UpsertType<HayStackType>;
  } catch (e) {
    throw Error(
      `Cannot return value as returnType '${config.returnType}'. Please try '${
        config.returnType == "array" ? "OBJECT" : "ARRAY"
      }' returnType, ERROR: RETURN_ERROR.`
    );
  }
}
