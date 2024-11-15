import { typeParam_upsert } from '../ts/upsert.type';

type configType = {
    returnType?: "object" | "array";
};
export declare function upserter<HayStackType>(haystack: HayStackType, needle: any, config?: configType): void;
export declare function upsert<HayStackType, Needle>(haystack: HayStackType, ...needles: typeParam_upsert<HayStackType, keyof Needle>[]): HayStackType;
export {};
