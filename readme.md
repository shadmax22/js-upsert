# js-upsert

`js-upsert` is a lightweight JavaScript library designed to simplify updating deeply nested properties within objects. It provides an intuitive and efficient way to manage complex object structures, ensuring non-destructive updates. This makes `js-upsert` a powerful tool for state management and other scenarios where precise modifications are necessary.

---

## Features

- **Intuitive Syntax**: Simplifies updates to deeply nested properties without a steep learning curve.
- **Non-destructive Updates**: Preserves the original structure, updating only the targeted keys.
- **Lightweight**: No dependencies, ensuring a small footprint.
- **Flexible API**: Supports multiple ways to update properties, including functional updates.

---

## Installation

Install `js-upsert` via npm or Yarn:

```bash
npm install js-upsert --save
```

```bash
yarn add js-upsert
```

---

## Usage

Import the library:

```javascript
import { upsert, set } from "js-upsert";
```

### Core Functions

1. **`upsert(haystack, ...needles?)`**: Main function to perform updates on the target object (`haystack`) using specified `needles`.

2. **`set(value, index?)`**: Helper function to define how specific keys should be updated.

3. **`at(...keys, value)`**: Method for directly targeting a nested path within an object to update its value.

---

## Examples

### Sample Object

```javascript
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
```

---

### Example 1: Updating a Key Using `set`

#### Update `user_data.login_data.token` to `"MY NEW VALUE"`:

```javascript
const updated = upsert(user_data, {
  login_data: {
    token: set("MY NEW VALUE"),
  },
});
console.log(updated);
```

#### Output:

```javascript
{
  name: "John Doe",
  age: 22,
  login_data: {
    data: [
      { time: "08:55 PM", date: "28-03-2024" },
      { time: "10:55 PM", date: "28-03-2024" },
    ],
    token: "MY NEW VALUE",
  },
}
```

**Explanation**:  
The `set` function specifies the value to update for a given key. This ensures non-destructive updates to the object.

---

### Example 2: Updating Using `at`

#### Update `user_data.login_data.data[1].time` to `"11:00 PM"`:

```javascript
const updated = upsert(user_data).at(
  "login_data",
  "data",
  1,
  "time",
  "11:00 PM"
);
console.log(updated);
```

#### Output:

```javascript
{
  name: "John Doe",
  age: 22,
  login_data: {
    data: [
      { time: "08:55 PM", date: "28-03-2024" },
      { time: "11:00 PM", date: "28-03-2024" },
    ],
    token: "13A131Q334",
  },
}
```

**Explanation**:  
`at` allows you to directly specify a nested path (`keys`) and a new `value` to update.

---

### Example 3: Functional Updates

#### Update `user_data.login_data.data[1].time` with a Function:

```javascript
const updated = upsert(user_data).at("login_data", "data", 1, (prev) => ({
  ...prev,
  time: "12:00 PM",
}));
console.log(updated);
```

#### Output:

```javascript
{
  name: "John Doe",
  age: 22,
  login_data: {
    data: [
      { time: "08:55 PM", date: "28-03-2024" },
      { time: "12:00 PM", date: "28-03-2024" },
    ],
    token: "13A131Q334",
  },
}
```

**Explanation**:  
You can pass a function to dynamically compute the updated value based on the previous value.

---

## API Reference

### `upsert(haystack, ...needles?)`

- **Parameters**:
  - `haystack`: The target object to update.
  - `needles`: Key-value pairs defining the properties to update.
- **Returns**: A new object with the updated structure.

---

### `set(value, index?)`

- **Parameters**:

  - `value`: The new value to set.
  - `index` (optional): An array to specify which elements in an array to update.

- **Returns**: An object describing the update operation.

---

### `at(...keys, value)`

- **Parameters**:

  - `keys`: An array of strings or numbers defining the path to the target key.
  - `value`: The new value to set, or a function to compute the value dynamically.

- **Returns**: A new object with the updated structure.

---

## Notes

- Use `upsert` for broader updates across multiple keys.
- Use `at` for precise updates to a single path.
