import { set } from '../set';

type GetType<Value> = Value extends string ? string : Value extends number ? number : Value extends boolean ? boolean : Value extends Array<any> ? GetType<Value[number]>[] : Value extends object ? {
    [Key in keyof Value]: GetType<Value[Key]>;
} : "unknown";
type InternalHookReturns<T> = T extends object ? {
    [K in keyof T]: InternalHookReturns<T[K]>;
} | ReturnType<typeof set<GetType<T>>> : ReturnType<typeof set<GetType<T>>>;
export type typeParam_upsert<H> = InternalHookReturns<H>;
export {};
