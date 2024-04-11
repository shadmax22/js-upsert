// interface SetReturn {
//   value: any[];
//   index: any[] | null;
// }

export function set(value: any, index: any[] | null = null): any {
  let r = Math.floor(Math.random() * 100);
  return {
    ["$$@@@@__upsert_hook_" + r]: {
      value: value,
      index: index,
      isFunction: typeof value == "function",
    },
  };
}
