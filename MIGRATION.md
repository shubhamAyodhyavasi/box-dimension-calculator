# Migration Guide — v1 → v2

This guide explains every breaking change introduced in v2.0.0 and provides
copy-paste examples to help you migrate quickly.

---

## Overview

| | v1.0.x | v2.0.0 |
|---|---|---|
| Language | JavaScript (CommonJS IIFE) | TypeScript (ESM + CJS) |
| Entry point | `index.js` | `dist/index.cjs` / `dist/index.js` |
| API | `combineLoop(items)` | `calculateBox(input)`, `getVolume()`, … |
| Input shape | `{ h, w, l }` | `{ height, width, length, unit? }` |
| Output | Single combined box `{ h, w, l }` | `{ volume, surfaceArea, dimensionalWeight, unit }` |
| Validation | None | Strict — throws `TypeError` / `RangeError` |
| Framework adapters | None | React hook, Vue composable, Angular service |
| Tree-shaking | ❌ | ✅ |

---

## Breaking Changes

### 1. Function renamed and redesigned

#### Before (v1)

```js
const { combineLoop } = require('box-dimension-calculator');

const items = [
  { h: 1, w: 4, l: 3 },
  { h: 2, w: 4, l: 2 },
];

const [result] = combineLoop(items);
// result → { h: 3, w: 4, l: 3 }  (merged bounding box)
```

#### After (v2)

v2 shifts focus from *combining* multiple boxes into a bounding box to
*calculating metrics* for a single box (volume, surface area, dimensional weight).

```ts
import { calculateBox } from 'box-dimension-calculator';

const result = calculateBox({ length: 3, width: 4, height: 3, unit: 'cm' });
// result → {
//   volume: 36,
//   surfaceArea: 66,
//   dimensionalWeight: 0.0072,
//   unit: 'cm'
// }
```

> **Note:** If you still need to compute a bounding box for a list of items,
> implement the logic yourself (or open an issue — we may re-add it as an
> optional utility in a future minor release).

---

### 2. Input property names changed

| v1 key | v2 key |
|--------|--------|
| `h` | `height` |
| `w` | `width` |
| `l` | `length` |
| *(none)* | `unit` (`'cm'` \| `'inch'`) — optional |

#### Migration snippet

```js
// v1 item shape
const v1Item = { h: 10, w: 5, l: 20 };

// Convert to v2 shape
const v2Input = { height: v1Item.h, width: v1Item.w, length: v1Item.l };
```

---

### 3. Input validation is now strict

v1 silently ignored invalid or missing values.  
v2 throws descriptive errors:

| Condition | Error type | Message |
|-----------|-----------|---------|
| `null` / non-object | `TypeError` | `Input must be an object` |
| Missing dimension | `TypeError` | `length is required` |
| Non-numeric dimension | `TypeError` | `width must be a number` |
| Zero or negative value | `RangeError` | `height must be greater than 0` |
| Non-positive divisor | `RangeError` | `divisor must be greater than 0` |

**Wrap calls in try/catch when inputs come from user input:**

```ts
import { calculateBox } from 'box-dimension-calculator';

try {
  const result = calculateBox({ length: 0, width: 5, height: 10 });
} catch (e) {
  if (e instanceof RangeError) console.error('Invalid dimension:', e.message);
}
```

---

### 4. Module format

v1 was a CommonJS IIFE (browser-only, no proper module system).

v2 ships dual **CJS + ESM**:

```js
// CommonJS (Node.js, older bundlers)
const { calculateBox } = require('box-dimension-calculator');

// ESM (modern bundlers, native Node.js ESM)
import { calculateBox } from 'box-dimension-calculator';

// Subpath exports
import { calculateBox } from 'box-dimension-calculator/core';
import { useBoxDimensions } from 'box-dimension-calculator/react';
import { useBoxDimensions } from 'box-dimension-calculator/vue';
import { BoxDimensionService } from 'box-dimension-calculator/angular';
```

---

## New Features in v2

### Individual calculation functions

```ts
import { getVolume, getSurfaceArea, getDimensionalWeight } from 'box-dimension-calculator';

const box = { length: 20, width: 15, height: 10, unit: 'cm' as const };

getVolume(box);                     // 3000
getSurfaceArea(box);                // 1300
getDimensionalWeight(box);          // 0.6  (÷ 5000)
getDimensionalWeight(box, 139);     // 21.58… (÷ 139 for inches)
```

### React hook

```tsx
import { useBoxDimensions } from 'box-dimension-calculator/react';

function BoxCard() {
  const { volume, surfaceArea, dimensionalWeight } = useBoxDimensions({
    length: 20, width: 15, height: 10, unit: 'cm',
  });
  return <p>Volume: {volume} cm³</p>;
}
```

### Vue composable

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useBoxDimensions } from 'box-dimension-calculator/vue';

const box = ref({ length: 20, width: 15, height: 10, unit: 'cm' as const });
const dims = useBoxDimensions(box);
</script>

<template>
  <p>Volume: {{ dims.volume }} cm³</p>
</template>
```

### Angular service

```ts
import { BoxDimensionService } from 'box-dimension-calculator/angular';

@Component({ /* … */ })
export class MyComponent {
  constructor(private dims: BoxDimensionService) {}

  result = this.dims.calculate({ length: 20, width: 15, height: 10, unit: 'cm' });
}
```

---

## Keeping v1 alongside v2

If you cannot migrate immediately, npm lets you install a specific version:

```bash
# Install v1 with a scoped alias (requires npm ≥ 6.9)
npm install box-calculator-v1@npm:box-dimension-calculator@1.0.1

# Then use both in the same file:
const { combineLoop } = require('box-calculator-v1');
import { calculateBox } from 'box-dimension-calculator'; // v2
```

The v1 code is preserved on the **`release/v1.0.1`** branch and published to
npm with the **`legacy`** dist-tag:

```bash
npm install box-dimension-calculator@legacy  # installs v1.0.1
npm install box-dimension-calculator         # installs v2 (latest)
```

---

## Quick-Reference Cheatsheet

```
v1                              v2
─────────────────────────────────────────────────────────────────
combineLoop(items)              calculateBox(input)
item.h / item.w / item.l        input.height / input.width / input.length
returns { h, w, l }             returns { volume, surfaceArea, dimensionalWeight, unit }
no validation                   strict validation (throws)
CJS IIFE only                   ESM + CJS, tree-shakable
no TypeScript types             full TypeScript types + JSDoc
```
