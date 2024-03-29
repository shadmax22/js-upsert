import { keyFinder } from "./keyfinder";
import deepUpdater from "./deepUpdater";
export function upsert(haystack: any, needle: any) {
  let { result } = keyFinder({ obj: needle }, "$$@@@@__upsert_hook");

  for (let key = 0; key < result.length; key++) {
    let ThisKey = result[key];

    deepUpdater(haystack, ThisKey.index, ThisKey.value, ThisKey.isFunction);
  }

  return haystack;
}
