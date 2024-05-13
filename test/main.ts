import { set } from "../src/set";
import { upsert } from "../src/upsert";

console.log(upsert(null, set(["g"])), { returnType: "array" });
