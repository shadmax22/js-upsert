import { Ignore, SetValueSignature } from "./types/set.type";

function getArrayFromStringIndex(str: string) {
  // Remove all brackets and quotes, then split by period
  return str.replace(/[\[\]'"]/g, "").split(".");
}

/**
 * Sets a value with a specific index.
 * This function internally generates a unique hook, but the hook details are abstracted away.
 *
 * @param value - The value to set.
 * @param index - The index which may specify where to apply the update.
 * @returns An object representing the result of the set operation.
 */

export const set = <T>(
  value: T | ((prevValue: T) => T),
  index?: null | (string | number)[] | string
): SetValueSignature<T> => {
  let r = Math.floor(Math.random() * 1000000);

  let indexParsed =
    typeof index == "string" ? getArrayFromStringIndex(index) : index;
  return {
    ["$$@@@@__upsert_hook_" + r]: {
      value: value as T,
      index: indexParsed ?? null,
      isFunction: typeof value == "function",
    },
  };
};

set.at = (...param: any[]) => {
  const index = param as any[];

  const final_value = index.pop();

  return set(final_value, index) as unknown as Ignore;
};

export default {
  set,
};
