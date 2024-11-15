import { set } from "../src/set";
import { type_setAt } from "./set.type";

type HasOnlyPrivateKeys<T> = keyof T extends `$$@@@@__upsert_hook_${number}`
  ? true
  : false;
export type setType<T> = {
  [K in keyof T as K extends `$$@@@@__upsert_hook_${number}`
    ? K
    : never]: T[K] extends { type: infer U } ? U : "set";
}[keyof T];

// type VerifySetSignature<T> = HasOnlyPrivateKeys<T> extends true
//   ? T extends SetValueSignature<any>
//     ? true
//     : false
//   : false;
type VerifySetSignature<T> = HasOnlyPrivateKeys<T> extends true ? true : false;

// Adjusted function with inferred type constraint

type ExtractSetValue<T> = T extends typeof set<infer U> ? U : never;

type InternalHookReturns<T> = T extends object
  ? { [K in keyof T]: InternalHookReturns<T[K]> } | ReturnType<typeof set<T>>
  : ReturnType<typeof set<T>>;

export type typeParam_upsert<H, T> = VerifySetSignature<T> extends true
  ? ExtractSetValue<T> extends H
    ? T
    : never
  : InternalHookReturns<H>;

export type type_up<H> = typeParam_upsert<
  HayStackType,
  SetValueSignature<object>
>[];
