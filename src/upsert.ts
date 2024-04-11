import { keyFinder } from "./keyfinder";
import deepUpdater from "./deepUpdater";
export function upsert(
  haystack: any,
  needle: any,
  config: {
    returnType?: "object" | "array";
  } = { returnType: "object" }
) {
  let { result } = keyFinder({ obj: needle }, "$$@@@@__upsert_hook");

  for (let key = 0; key < result.length; key++) {
    let ThisKey = result[key];

    if (ThisKey.index.length == 0) {
      haystack = deepUpdater(
        haystack,
        ThisKey.index,
        ThisKey.value,
        ThisKey.isFunction
      );
    } else {
      deepUpdater(haystack, ThisKey.index, ThisKey.value, ThisKey.isFunction);
    }
  }

  return (config?.returnType ?? "object") == "object"
    ? { ...haystack }
    : [...haystack];
}
