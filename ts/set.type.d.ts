import { set } from "../src/set";
import { typeParam_upsert } from "./upsert.type";

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
type TypeReturner<T> = T extends number
  ? number // If T is a number, return number
  : T extends string
  ? string // If T is a string, return string
  : T extends boolean
  ? boolean // If T is a boolean, return boolean
  : T extends Array<infer U>
  ? Array<TypeReturner<U>> // If T is an array, recursively apply TypeReturner to each element
  : T extends object
  ? { [K in keyof T]: TypeReturner<T[K]> } // If T is an object, apply TypeReturner to each property
  : T; // Default case: return T itself

export type type_setAt<T> = T extends object
  ? {
      [K in keyof T]: [K, TypeReturner<K>] | [K, ...type_setAt<T[K]>];
    }[keyof T]
  : [TypeReturner<T>];

export type ConvertToNestedObject<T extends any[]> = T extends [
  infer First extends any,
  infer Last extends any
]
  ? { [K in First]: TypeReturner<Last> } // Base case for the last two elements
  : T extends [infer First extends any, ...infer Rest extends any[]]
  ? { [K in First]: ConvertToNestedObject<Rest> }
  : never;

export type typeReturn_setAt<
  Path extends (string | number)[],
  FinalType
> = Path extends [infer Head extends string, ...infer Rest extends string[]]
  ? { [K in Head]: typeReturn_setAt<Rest, FinalType> }
  : SetPathSignature<FinalType>;

export type Ignore = {
  id: Symbol;
};
