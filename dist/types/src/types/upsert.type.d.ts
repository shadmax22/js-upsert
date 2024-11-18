import { set } from '../set';

type InternalHookReturns<T> = T extends object ? {
    [K in keyof T]: InternalHookReturns<T[K]>;
} | ReturnType<typeof set<T>> : ReturnType<typeof set<T>>;
export type typeParam_upsert<H> = InternalHookReturns<H>;
export {};
