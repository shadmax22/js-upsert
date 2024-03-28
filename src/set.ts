// interface SetReturn {
//   value: any[];
//   index: any[] | null;
// }

export function set(value: any, index: any[] | null = null): any {
  return { "$$@@@@__upsert_hook": { value: value, index: index } };
}
