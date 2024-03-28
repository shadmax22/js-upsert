import { set } from "../src/set";
import { upsert } from "../src/upsert";

let OBJ = {
  newr: {
    greeen: {},
  },
};
let g = upsert({ newr: { greeen: set("g") } }, OBJ);

console.log(g);
