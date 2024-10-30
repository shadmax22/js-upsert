import { set } from "../set";
import { upsert } from "../upsert";

let R = upsert(["g", "gr"], set({ id: 2 }));

console.log(R);
