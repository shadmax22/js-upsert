declare module "js-upsert" {
  export function upsert(
    haystack: any,
    needle: object | ((...args: any[]) => any),
    config?: {
      returnType?: "object" | "array";
    }
  ): any;
}
