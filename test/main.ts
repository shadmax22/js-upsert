import { set } from "../src/set";
import { upsert } from "../src/upsert";

let user_data = {
  name: "John Doe",
  age: 22,
  login_data: {
    data: [
      { time: "08:55 PM", date: "28-03-2024" },
      { time: "10:55 PM", date: "28-03-2024" },
    ],

    token: "13A131Q334",
  },
};
// let g = upsert(user_data, {
//   login_data: {
//     data: set((old_key_value) => ({ ...old_key_value, time: "11:00 PM" }), [1]),
//   },
// });
let g = upsert(user_data, {
  login_data: {
    data: set("11:00 PM", [1, "time"]),
  },
});

console.log(g);
