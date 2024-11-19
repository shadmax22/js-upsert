import { typeParam_upsert, UpsertType } from './types/upsert.type';

type configType = {
    returnType?: "object" | "array";
};
export declare function upserter<HayStackType>(haystack: HayStackType, needle: any, config?: configType): void;
export declare function upsert<HayStackType>(haystack: HayStackType, ...needles: typeParam_upsert<HayStackType>[]): UpsertType<HayStackType>;
declare const _default: {
    upsert: typeof upsert;
};
export default _default;
