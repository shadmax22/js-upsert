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
type TypeReturner<T> = T extends number ? number : T extends string ? string : T extends boolean ? boolean : T extends Array<infer U> ? Array<TypeReturner<U>> : T extends object ? {
    [K in keyof T]: TypeReturner<T[K]>;
} : T;
export type type_setAt<T> = T extends object ? {
    [K in keyof T]: [K, TypeReturner<K>] | [K, ...type_setAt<T[K]>];
}[keyof T] : [TypeReturner<T>];
export type typeReturn_setAt<Path extends (string | number)[], FinalType> = Path extends [infer Head extends string, ...infer Rest extends string[]] ? {
    [K in Head]: typeReturn_setAt<Rest, FinalType>;
} : SetPathSignature<FinalType>;
export type Ignore = {
    id: Symbol;
};
export {};
