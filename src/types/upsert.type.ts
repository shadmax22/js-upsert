import { set } from "../set";

// export type setType<T> = {
//   [K in keyof T as K extends `$$@@@@__upsert_hook_${number}`
//     ? K
//     : never]: T[K] extends { type: infer U } ? U : "set";
// }[keyof T];

// type VerifySetSignature<T> = HasOnlyPrivateKeys<T> extends true
//   ? T extends SetValueSignature<any>
//     ? true
//     : false
//   : false;
//
export type UpsertType<HayStackType> = {
  (
    haystack: HayStackType,
    ...needles: typeParam_upsert<HayStackType>[]
  ): HayStackType; // The function itself
} & HayStackType & {
    at: (
      ...keys: [...(string | number)[], unknown | ((pv: any) => unknown)]
    ) => UpsertType<HayStackType>; // The `at` method
    get: () => HayStackType; // The `at` method
  };

type GetType<Value> = Value extends string
  ? string
  : Value extends number
  ? number
  : Value extends boolean
  ? boolean
  : Value extends Array<any>
  ? GetType<Value[number]>[]
  : Value extends object
  ? {
      [Key in keyof Value]: GetType<Value[Key]>;
    }
  : "unknown";

type InternalHookReturns<T> = T extends object
  ?
      | { [K in keyof T]: InternalHookReturns<T[K]> }
      | ReturnType<typeof set<GetType<T>>>
  : ReturnType<typeof set<GetType<T>>>;

// type VerifySetSignature<T> = HasOnlyPrivateKeys<T> extends true ? true : false;

// // Adjusted function with inferred type constraint

// type HasOnlyPrivateKeys<T> = keyof T extends `$$@@@@__upsert_hook_${number}`
//   ? true
//   : false;
// type ExtractSetValue<T> = T extends typeof set<infer U> ? U : never;

// export type typeParam_upsert<H, T> = VerifySetSignature<T> extends true
//   ? ExtractSetValue<T> extends H
//     ? T
//     : never
//   : InternalHookReturns<H>;
export type typeParam_upsert<H> = InternalHookReturns<H>;

// export type type_up<H> = typeParam_upsert<
//   HayStackType,
//   SetValueSignature<object>
// >[];
