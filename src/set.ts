// interface SetReturn {
//   value: any[];
//   index: any[] | null;
// }

export function set(value: any, index: any[] | null | string = null): any {
  let r = Math.floor(Math.random() * 100);

  let indexParsed =
    typeof index == "string" ? getArrayFromStringIndex(index) : index;
  return {
    ["$$@@@@__upsert_hook_" + r]: {
      value: value,
      index: indexParsed,
      isFunction: typeof value == "function",
    },
  };
}

function getArrayFromStringIndex(str: string) {
  // Remove all brackets and quotes, then split by period
  return str.replace(/[\[\]'"]/g, "").split(".");
}
