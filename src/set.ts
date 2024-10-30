export interface SetValueSignature<T> {
  [key: `$$@@@@__upsert_hook_${number}`]: {
    value: T;
    index: (string | number)[] | null | string;
    isFunction: boolean;
  };
}
export interface SetPathSignature<T> {
  [key: `$$@@@@__upsert_hook_${number}`]: {
    value: T;
    index: (string | number)[] | null | string;
    isFunction: boolean;
  };
}

type SetType = [value: any, index: any[] | null | string];

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

export const set = <T, K extends null | (string | number)[] | string>(
  value: T | ((prevValue: T) => unknown),
  index?: K
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

const utilSetter = (
  value: any,
  index: (string | number)[] | null | string = null,
  returnValue: (pv: any, valueToAppend: any) => any
) => {
  return set((pv: any) => {
    const valueToAppend = typeof value == "function" ? value(pv) : value;
    return returnValue(pv, valueToAppend);
  }, index ?? null);
};

type SetKeysType<T extends any[]> = T extends [...infer Keys, infer Value]
  ? Keys extends string[]
    ? Value extends object | string
      ? NestedObject<Keys, SetPathSignature<Value>>
      : never
    : never
  : never;

// Recursive type for building the nested object
type NestedObject<Keys extends string[], Value> = Keys extends [
  infer First,
  ...infer Rest
]
  ? First extends string
    ? {
        [K in First]: NestedObject<Rest extends string[] ? Rest : [], Value>;
      }
    : never
  : Value;

export type Ignore = {
  id: Symbol;
};

set.keys = <K extends [...(string | number)[], any]>(...param: K): any => {
  const index = param as (string | number)[];

  const final_value = index.pop();

  return set(final_value, index) as any;
};

/*
    SET UTITLS
    
    AIM: TO PORVIDE EASE TOOLS FOR OBJECT MANIPULATION
    IDEA-ORGIN: 04-10-2024
    WRITTEN BY: MD SHAD ALI 
 */

set.prepend = (...param: SetType) =>
  utilSetter(...param, (pv, valueToAppend) =>
    pv === null
      ? valueToAppend
      : Array.isArray(pv)
      ? [...valueToAppend, ...pv]
      : { ...valueToAppend, ...pv }
  );
set.append = (...param: SetType) =>
  utilSetter(...param, (pv, valueToAppend) =>
    pv === null
      ? valueToAppend
      : Array.isArray(pv)
      ? [...pv, ...valueToAppend]
      : { ...pv, ...valueToAppend }
  );

/**
 * Generates a random numbers of length n.
 *
 * @param length - The length of random numbers to generate.
 * @returns An random number of n digit.
 */
set.random = (length: number): number => {
  const characters = "0123456789"; // Only digits
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex]; // Append a random digit to the token
  }

  return Number(token); // Convert the token string to a number
};
