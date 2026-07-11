# 001 - Hero Carousel Architecture

## Architecture Overview

This document explains the complete data flow of the Hero Carousel feature, starting from the mock database (`menu.json`) until menu cards are rendered on screen and updated through carousel navigation.

The goal of this documentation is not only to explain what each component does, but also why each step exists and how data changes shape while moving through the application.

---

## Full Data Flow

```mermaid
flowchart TD

A["menu.json"]
A --> B["getMenus() - menuService.ts"]
B --> C["HeroSection"]
C --> D["menus State"]
D --> E["filter(tag === recommend)"]
E --> F["recommendMenus"]
F --> G["chunkArray()"]
G --> H["slides (2D Array)"]
H --> I["currentSlide State"]
I --> J["slides[currentSlide]"]
J --> K["HeroCardArea"]
K --> L["HeroCard"]

H --> M["slides.length"]
M --> N["HeroCarousel"]
N --> O["User Click"]
O --> P["setCurrentSlide()"]
P --> I
```

---

# Step 1 - Data Source

## menu.json

The Hero Carousel feature begins with data stored inside `menu.json`.

This file acts as a temporary mock database. Instead of requesting data from a real backend API, the application retrieves menu data from this local JSON file.

Every menu item contains information such as:

- id
- name
- description
- price
- category
- tag
- stars

Example:

```json
{
  "id": 1,
  "name": "Greek Salad",
  "tag": "recommend"
}
```

At this stage, the data is simply a collection of menu objects. There is no filtering, grouping, carousel logic, or slide concept yet.

The JSON file only acts as the source of truth.

---

# Step 2 - Service Layer

## menuService.ts

The next step is the service layer.

```ts
export async function getMenus(): Promise<Menu[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menus as Menu[]);
    }, 500);
  });
}
```

The purpose of this file is to separate data retrieval logic from UI logic.

Instead of allowing components to directly import menu data from the JSON file, the component communicates with a service function.

This approach provides several advantages:

- Components become cleaner.
- Data retrieval logic is centralized.
- Future migration to a real API becomes easier.
- Components remain focused on rendering.

The `setTimeout()` is used to simulate API latency.

Although the data comes from a local file, the Hero section behaves as if it were waiting for a server response.

This helps prepare the application architecture for future backend integration.

---

# Step 3 - Loading Data Into HeroSection

When `HeroSection` mounts, the component requests menu data.

```tsx
useEffect(() => {
  async function loadMenus() {
    const data = await getMenus();
    setMenus(data);
  }

  loadMenus();
}, []);
```

The process can be visualized as:

```txt
HeroSection Mounted
        ↓
getMenus()
        ↓
await Promise
        ↓
receive data
        ↓
setMenus(data)
        ↓
React Re-render
```

Initially:

```ts
menus = [];
```

After the service resolves:

```ts
menus = Menu[]
```

At this stage, the component finally owns the complete collection of menu data.

However, the Hero Carousel still cannot render anything useful because all menu items are mixed together inside a single collection.

---

# Step 4 - Filter Recommended Menus

The Hero section is designed to highlight recommended products.

For that reason, not every menu item should appear inside the carousel.

The application performs a filtering process:

```ts
const recommendMenus = menus.filter((menu) => menu.tag === "recommend");
```

This statement creates a brand new array containing only recommended menu items.

Example:

Before filtering:

```txt
Greek Salad
Cappuccino
Chicken Burger
Vanilla Latte
Beef Burger
```

After filtering:

```txt
Greek Salad
Chicken Burger
Beef Burger
```

The original `menus` state remains unchanged.

Instead, a new collection called:

```ts
recommendMenus;
```

is created.

This collection becomes the data source for the Hero Carousel.

---

# Step 5 - Create Carousel Slides

Even after filtering, there is still a problem.

The data exists as a one-dimensional array.

Example:

```ts
[menu1, menu2, menu3, menu4, menu5, menu6, menu7, menu8, menu9, menu10];
```

However, the Hero Carousel displays data in groups.

The UI expects:

```ts
[
  [menu1, menu2, menu3, menu4],
  [menu5, menu6, menu7, menu8],
  [menu9, menu10],
];
```

This transformation is performed using:

```ts
const ITEMS_PER_SLIDE = 4;

const slides = chunkArray(recommendMenus, ITEMS_PER_SLIDE);
```

The result is a two-dimensional array.

Each inner array represents a complete slide.

The carousel now has a structure that matches how the UI operates.

---

# Step 6 - Active Slide State

After slide groups are created, the application needs a way to determine which slide should currently be displayed.

This responsibility belongs to:

```tsx
const [currentSlide, setCurrentSlide] = useState(0);
```

Initially:

```txt
currentSlide = 0
```

Meaning:

```ts
slides[0];
```

is displayed.

If:

```txt
currentSlide = 1
```

Then:

```ts
slides[1];
```

is displayed.

Rather than storing menu data inside state, the application only stores the currently selected slide index.

This makes state management lightweight and efficient.

---

# Step 7 - Send Active Slide Into HeroCardArea

Once the active slide is known, the component selects the corresponding chunk.

```tsx
<HeroCardArea menus={slides[currentSlide] ?? []} />
```

This statement is extremely important.

Remember:

```ts
slides;
```

contains multiple groups.

Example:

```ts
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10],
];
```

If:

```txt
currentSlide = 0
```

The component receives:

```ts
[1, 2, 3, 4];
```

If:

```txt
currentSlide = 1
```

The component receives:

```ts
[5, 6, 7, 8];
```

The fallback:

```ts
?? []
```

prevents runtime errors during the initial render before menu data has finished loading.

---

# Step 8 - HeroCardArea

The responsibility of `HeroCardArea` is simple.

It receives a single slide block.

```ts
type HeroCardAreaProps = {
  menus: Menu[];
};
```

This means the component receives:

```ts
[menu1, menu2, menu3, menu4];
```

rather than:

```ts
[
  [menu1, menu2, menu3, menu4],
  [menu5, menu6, menu7, menu8],
];
```

The component loops through every menu item.

```tsx
menus.map((menu) => <HeroCard key={menu.id} menu={menu} />);
```

Every iteration creates a new HeroCard component.

The component does not care about slides or carousel navigation.

Its only responsibility is rendering the current group of menu items.

---

# Step 9 - HeroCard

HeroCard is the smallest unit inside the Hero architecture.

The component receives a single menu object.

```tsx
type HeroCardProps = {
  menu: Menu;
};
```

Example:

```ts
{
  id: 1,
  name: "Greek Salad",
  description: "...",
  price: 80
}
```

The component simply displays:

- Menu Name
- Description
- Price

HeroCard does not know:

- where the data came from
- how filtering works
- how chunking works
- how carousel navigation works

It only renders the menu object it receives.

This separation of responsibilities makes the component highly reusable.

---

# Step 10 - HeroCarousel

The Hero Carousel receives three important props.

```tsx
<HeroCarousel
  totalSlides={slides.length}
  currentSlide={currentSlide}
  setCurrentSlide={setCurrentSlide}
/>
```

---

## totalSlides

```tsx
totalSlides={slides.length}
```

This value determines how many navigation buttons should be rendered.

If:

```txt
slides.length = 3
```

The UI generates:

```txt
[1] [2] [3]
```

automatically.

No manual button creation is required.

---

## currentSlide

```tsx
currentSlide = { currentSlide };
```

This tells the carousel which slide is currently active.

The active button receives a different CSS class.

```tsx
currentSlide === index;
```

This creates visual feedback for users.

---

## setCurrentSlide

```tsx
setCurrentSlide = { setCurrentSlide };
```

This function allows the carousel to update the active slide.

```tsx
onClick={() =>
  setCurrentSlide(index)
}
```

Whenever a button is clicked, React updates the state.

---

# Step 11 - User Interaction

Imagine the user clicks button number 2.

```txt
User Click
     ↓
setCurrentSlide(1)
```

React updates state.

```txt
currentSlide = 1
```

The component re-renders.

```txt
HeroSection Re-render
```

Now:

```ts
slides[1];
```

becomes the active slide.

The new data is sent into:

```txt
HeroCardArea
```

which creates a new collection of:

```txt
HeroCard
```

components.

The entire UI updates automatically without requiring any manual DOM manipulation.

This is one of the core strengths of React's declarative rendering model.

---

# Complete Data Transformation

The easiest way to understand the entire architecture is to follow the data from start to finish.

```txt
menu.json
    ↓
getMenus()
    ↓
menus State
    ↓
filter(tag === "recommend")
    ↓
recommendMenus
    ↓
chunkArray()
    ↓
slides (2D Array)
    ↓
slides[currentSlide]
    ↓
HeroCardArea
    ↓
HeroCard
```

Carousel update flow:

```txt
HeroCarousel
      ↓
User Click
      ↓
setCurrentSlide()
      ↓
currentSlide State
      ↓
HeroSection Re-render
      ↓
slides[currentSlide]
      ↓
HeroCardArea
      ↓
HeroCard
```

---

# Summary

The Hero Carousel architecture is built around a sequence of data transformations.

Raw menu data begins inside `menu.json`.

The service layer exposes that data through `getMenus()`.

HeroSection loads the data and stores it inside state.

The data is filtered to keep only recommended menus.

The filtered data is transformed into slide groups using `chunkArray()`.

The currently active slide is selected using `currentSlide`.

That slide is passed into HeroCardArea.

HeroCardArea renders multiple HeroCard components.

Meanwhile, HeroCarousel controls which slide is active by updating `currentSlide`.

Because every responsibility is separated into small components, the architecture remains clean, reusable, and easy to maintain as the project grows.
