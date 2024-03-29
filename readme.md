# js-upsert

`js-upsert` is a lightweight JavaScript library designed to simplify the updating process of deeply nested properties within objects. It offers an intuitive way to precisely modify values deep within an object's structure without altering unrelated keys, making it an essential tool for efficient state management in complex applications.

## Features

- **Intuitive Syntax**: Easy to understand and use for updating nested properties.
- **Non-destructive**: Keeps the original object structure intact, only modifying specified keys.
- **Dependency-Free**: Lightweight with no external dependencies, ensuring a minimal footprint.

## Installation

You can easily install `js-upsert` using npm or Yarn:

```bash
npm install js-upsert --save
```

### USAGE

```bash
import { upsert, set } from "js-upsert";

```

```bash
upsert(HAYSTACK, NEEDLE)
```

### EXAMPLES

Taken a sample object named `user_data`.

```bash

let user_data = {
    name: "John Doe",
    age: 22,
    login_data:{
        data: [
            {time: "08:55 PM", date: "28-03-2024"},
            {time: "10:55 PM", date: "28-03-2024"},
        ],

        token: "13A131Q334"
    }
}

```

#### UPDATING A KEY

Updating `user_data.login_data.token` to `MY NEW VALUE`:-

```bash

upsert(user_data, {
    login_data:{
        token: set("MY NEW VALUE")
    }
})

```

It will return:-

```bash
{
    name: "John Doe",
    age: 22,
    login_data:{
        data: [
            {time: "08:55 PM", date: "28-03-2024"},
            {time: "10:55 PM", date: "28-03-2024"},
        ],

        token: "MY NEW VALUE"
    }
}
```

#### UPDATING A ARRAY

Updating `user_data.login_data.data[1].time` to `11:00 PM`:-

```bash

upsert(user_data, {
  login_data: {
    data: set("11:00 PM", [1, "time"]),
  },
});


// Here index provided is [1, "time"] undex a key "data"

```

Alternate way to update `user_data.login_data.data[0].time` to `12:00 PM`:-

```bash

upsert(user_data, {
    login_data:{
        data: set((old_key_value) => {...old_key_value, time: "11:00 PM"}, [1])
    }
})

// Here index provided is [1]

```

**EXPLANATION:-**

`upsert(haystack, needle)` will have 2 parameters, Object & Needle.

"Haystack" is the target variable which we have to update and needle is new value that has to be updated in target.

In needle, `set(value = string | object | function, index= null | [] )` function will point a update key, and update it.
