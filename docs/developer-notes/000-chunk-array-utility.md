# chunkArray Utility Function

## Overview

At first glance, the `chunkArray()` utility function may look like a simple helper that divides a large array into several smaller arrays. While that statement is technically correct, it does not explain the real reason why this utility was created inside the project.

The primary purpose of `chunkArray()` is to solve a user interface problem, not a data problem.

Inside the Hero Carousel feature, menu data is retrieved from the service layer and filtered based on specific business requirements. After the filtering process is completed, the resulting data still exists as a normal one-dimensional array.

For example:

````ts
[
  menu1,
  menu2,
  menu3,
  menu4,
  menu5,
  menu6,
  menu7,
  menu8,
  menu9,
  menu10
]

---

## Visual Flow

```mermaid
flowchart TD

A["Source Array"]
--> B["Loop (index += size)"]

B --> C["slice(index, index + size)"]

C --> D["Create Chunk"]

D --> E["Push into chunks"]

E --> F["Next Iteration"]

F --> B

B --> G["Return chunks"]
````

---

## Source Code

```ts
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}
```

---

## Generic Type

The function uses a generic type parameter:

```ts
<T>
```

This means the utility is not limited to menu data and can work with any array type.

Examples:

```ts
chunkArray<number>(numbers, 4);

chunkArray<string>(names, 2);

chunkArray<Menu>(menus, 4);
```

Because of generics, TypeScript automatically preserves the original array type.

---

## Parameters

### array

```ts
array: T[]
```

The source array that will be divided into smaller groups.

Example:

```ts
[1, 2, 3, 4, 5, 6, 7, 8];
```

---

### size

```ts
size: number;
```

Determines how many items should exist inside each chunk.

Example:

```ts
size = 4;
```

Result:

```txt
[1,2,3,4]
[5,6,7,8]
```

---

## Return Type

```ts
T[][]
```

The function returns a two-dimensional array.

Example:

```ts
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
];
```

The outer array contains chunks.

The inner arrays contain grouped items.

---

## Step 1 - Create Result Container

An empty array is prepared to store chunk results.

```ts
const chunks: T[][] = [];
```

Initial state:

```txt
chunks = []
```

---

## Step 2 - Iterate Through Source Array

The loop moves through the source array using increments based on the chunk size.

```ts
for (
  let index = 0;
  index < array.length;
  index += size
)
```

Example:

```ts
array.length = 10;
size = 4;
```

Loop execution:

```txt
index = 0
index = 4
index = 8
```

The loop jumps by four positions each iteration.

---

## Step 3 - Extract Chunk Data

For each iteration:

```ts
array.slice(index, index + size);
```

extracts a portion of the array.

---

### First Iteration

```txt
index = 0
```

```ts
array.slice(0, 4);
```

Result:

```txt
[1,2,3,4]
```

---

### Second Iteration

```txt
index = 4
```

```ts
array.slice(4, 8);
```

Result:

```txt
[5,6,7,8]
```

---

### Third Iteration

```txt
index = 8
```

```ts
array.slice(8, 12);
```

Result:

```txt
[9,10]
```

Even though index `12` does not exist, JavaScript safely returns the remaining elements.

---

## Step 4 - Store Chunk

Each chunk is pushed into the result array.

```ts
chunks.push(array.slice(index, index + size));
```

Progression:

```txt
[]
```

↓

```txt
[
  [1,2,3,4]
]
```

↓

```txt
[
  [1,2,3,4],
  [5,6,7,8]
]
```

↓

```txt
[
  [1,2,3,4],
  [5,6,7,8],
  [9,10]
]
```

---

## Step 5 - Return Final Result

After all iterations are complete:

```ts
return chunks;
```

Output:

```ts
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10],
];
```

---

## Hero Carousel Example

Inside `HeroSection`:

```ts
const recommendMenus = menus.filter((menu) => menu.tag === "recommend");

const slides = chunkArray(recommendMenus, 4);
```

If there are 10 recommended menus:

```txt
recommendMenus

[1,2,3,4,5,6,7,8,9,10]
```

The result becomes:

```txt
slides

[
  [1,2,3,4],
  [5,6,7,8],
  [9,10]
]
```

Each inner array represents one carousel slide.

This allows the Hero Carousel to display menus in groups rather than rendering all menu items at once.
