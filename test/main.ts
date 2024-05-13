import { set } from "../src/set";
import { upsert } from "../src/upsert";

console.log(upsert(["g"], set("g", "green")));
