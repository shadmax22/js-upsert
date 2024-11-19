import { typeParam_upsert } from './types/upsert.type';

type configType = {
    returnType?: "object" | "array";
};
export declare function upserter<HayStackType>(haystack: HayStackType, needle: any, config?: configType): void;
type UpsertType<HayStackType> = {
    (haystack: HayStackType, ...needles: typeParam_upsert<HayStackType>[]): HayStackType;
} & HayStackType & {
    at: (...keys: [...(string | number)[], any]) => UpsertType<HayStackType>;
    get: () => HayStackType;
};
export declare function upsert<HayStackType>(haystack: HayStackType, ...needles: typeParam_upsert<HayStackType>[]): UpsertType<HayStackType>;
export {};
