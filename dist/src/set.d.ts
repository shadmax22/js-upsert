import { Ignore, SetValueSignature } from '../ts/set.type';

/**
 * Sets a value with a specific index.
 * This function internally generates a unique hook, but the hook details are abstracted away.
 *
 * @param value - The value to set.
 * @param index - The index which may specify where to apply the update.
 * @returns An object representing the result of the set operation.
 */
export declare const set: {
    <T>(value: T | ((prevValue: T) => T), index?: null | (string | number)[] | string): SetValueSignature<T>;
    at(...param: any[]): Ignore;
};
