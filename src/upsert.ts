import deepUpdater from "./deepUpdater";
import { keyFinder } from "./keyfinder";
import { SetPathSignature, SetValueSignature } from "./set";

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

type HasOnlyPrivateKeys<T> = keyof T extends `$$@@@@__upsert_hook_${number}`
  ? true
  : false;

// Conditional type to validate the key pattern
type VerifySetSignature<T> = HasOnlyPrivateKeys<T> extends true
  ? T extends SetPathSignature<any>
    ? true
    : false
  : false;

// Adjusted function with inferred type constraint

type ExtractSetValue<T> = T extends SetValueSignature<infer U> ? U : never;

export type InternalHookReturns<T> = T extends object
  ? { [K in keyof T]: InternalHookReturns<T[K]> } | SetValueSignature<T>
  : SetValueSignature<T> | SetPathSignature<T>;

export type InternalHookReturnsPartial<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends SetPathSignature<T>
        ? SetPathSignature<T[K]>
        : InternalHookReturnsPartial<T[K]>;
    }
  : SetPathSignature<T>;

// InternalHookReturns<T[K]> |

export type WithInternalHooks<T> = {
  [K in keyof T]: InternalHookReturns<T[K]>;
};

type ConditionalType<H, T> = VerifySetSignature<T> extends true
  ? ExtractSetValue<T> extends H
    ? T
    : never
  : InternalHookReturns<H>;

export function upsert<HayStackType, needle>(
  haystack: HayStackType,
  ...needles: Array<ConditionalType<HayStackType, needle>>
): HayStackType {
  let config = {
    returnType: "object",
  } as configType;
  const haystackArrayValidation = Array.isArray(haystack);
  // if (haystackArrayValidation) config.returnType = "array"; // IF INITAL VALUE IS ARRAY THEN RETURN IN ARRAY

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

// const set_exists = <T>(x: VerifySetSignature<T> extends true ? T : never) => {};

// set_exists(set({ g: "green" }));

// const haystack_set = <H, T>(
//   x: H,
//   y: VerifySetSignature<T> extends true
//     ? ExtractSetValue<T> extends H
//       ? T
//       : never
//     : never
// ) => {};

// haystack_set({ g: "green", k: "gr" }, set({ g: "green" }));
// haystack_set({ g: "green", k: "gr" }, set({ g: "green", k: "g" }));

// const haystack_set_2 = <H, T>(
//   x: H,
//   y: VerifySetSignature<T> extends true
//     ? ExtractSetValue<T> extends H
//       ? T
//       : never
//     : InternalHookReturns<H>
// ) => {};

// haystack_set_2({ g: "green", k: "gr" }, { g: set("22") });
