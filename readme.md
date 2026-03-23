# box-dimension-calculator

A production-ready, framework-agnostic TypeScript library for calculating box dimensions — volume, surface area, and dimensional (volumetric) weight — with optional adapters for React, Vue, and Angular.

## Features

- 📦 Calculate volume, surface area, and dimensional weight
- 🌳 Tree-shakable ES modules
- 🔷 Full TypeScript support with declaration files
- ⚛️ React hook (`useBoxDimensions`)
- 💚 Vue composable (`useBoxDimensions`)
- 🔴 Angular injectable service (`BoxDimensionService`)
- ✅ Validated inputs with descriptive error messages
- 🪶 Zero runtime dependencies

## Installation

```bash
npm install box-dimension-calculator
```

For framework adapters, ensure the peer dependency is installed:

```bash
# React
npm install react

# Vue
npm install vue

# Angular
npm install @angular/core
```

## Usage

### Core (Node.js / Framework-agnostic)

```typescript
import { calculateBox, getVolume, getSurfaceArea, getDimensionalWeight } from 'box-dimension-calculator';

const box = { length: 30, width: 20, height: 15, unit: 'cm' };

// All at once
const result = calculateBox(box);
console.log(result);
// {
//   volume: 9000,
//   surfaceArea: 2700,
//   dimensionalWeight: 1.8,
//   unit: 'cm'
// }

// Individual calculations
console.log(getVolume(box));           // 9000
console.log(getSurfaceArea(box));      // 2700
console.log(getDimensionalWeight(box)); // 1.8

// Custom divisor (e.g., 139 for inches)
const inchBox = { length: 12, width: 8, height: 6, unit: 'inch' };
console.log(getDimensionalWeight(inchBox, 139)); // ~4.15
```

### React

```tsx
import { useBoxDimensions } from 'box-dimension-calculator/react';

function BoxInfo() {
  const result = useBoxDimensions({ length: 30, width: 20, height: 15, unit: 'cm' });

  return (
    <div>
      <p>Volume: {result.volume} cm³</p>
      <p>Surface Area: {result.surfaceArea} cm²</p>
      <p>Dimensional Weight: {result.dimensionalWeight} kg</p>
    </div>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useBoxDimensions } from 'box-dimension-calculator/vue';

const box = ref({ length: 30, width: 20, height: 15, unit: 'cm' as const });
const result = useBoxDimensions(box);
</script>

<template>
  <div>
    <p>Volume: {{ result.volume }} cm³</p>
    <p>Surface Area: {{ result.surfaceArea }} cm²</p>
    <p>Dimensional Weight: {{ result.dimensionalWeight }} kg</p>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { BoxDimensionService } from 'box-dimension-calculator/angular';

@Component({
  selector: 'app-box',
  template: `
    <p>Volume: {{ result.volume }}</p>
    <p>Surface Area: {{ result.surfaceArea }}</p>
    <p>Dimensional Weight: {{ result.dimensionalWeight }}</p>
  `
})
export class BoxComponent {
  result = this.boxService.calculate({ length: 30, width: 20, height: 15, unit: 'cm' });

  constructor(private boxService: BoxDimensionService) {}
}
```

## API Reference

### Types

#### `BoxUnit`
```typescript
type BoxUnit = 'cm' | 'inch';
```

#### `BoxInput`
| Property | Type       | Required | Description                      |
|----------|------------|----------|----------------------------------|
| length   | `number`   | ✅        | Length of the box                |
| width    | `number`   | ✅        | Width of the box                 |
| height   | `number`   | ✅        | Height of the box                |
| unit     | `BoxUnit`  | ❌        | Unit of measurement (default: `'cm'`) |

#### `BoxOutput`
| Property           | Type      | Description                          |
|--------------------|-----------|--------------------------------------|
| volume             | `number`  | Volume in cubic units                |
| surfaceArea        | `number`  | Total surface area in square units   |
| dimensionalWeight  | `number`  | Dimensional (volumetric) weight      |
| unit               | `BoxUnit` | Unit used for the calculation        |

### Core Functions

#### `calculateBox(input: BoxInput, divisor?: number): BoxOutput`
Calculates all box metrics at once. Default divisor is `5000` (standard for cm).

#### `getVolume(input: BoxInput): number`
Returns `length × width × height`.

#### `getSurfaceArea(input: BoxInput): number`
Returns `2 × (lw + wh + hl)`.

#### `getDimensionalWeight(input: BoxInput, divisor?: number): number`
Returns `volume / divisor`. Default divisor is `5000`.

#### `validateBoxInput(input: BoxInput): void`
Validates the input object. Throws `TypeError` for missing/invalid fields and `RangeError` for non-positive values.

### React Hook

#### `useBoxDimensions(input: BoxInput, divisor?: number): BoxOutput`
Memoized React hook. Recalculates only when input dimensions or divisor change.

### Vue Composable

#### `useBoxDimensions(input: Ref<BoxInput> | BoxInput, divisor?: number | Ref<number>): ComputedRef<BoxOutput>`
Vue computed composable. Accepts both reactive refs and plain objects.

### Angular Service

#### `BoxDimensionService`
Injectable service (provided in root). Methods:
- `calculate(input, divisor?): BoxOutput`
- `getVolume(input): number`
- `getSurfaceArea(input): number`
- `getDimensionalWeight(input, divisor?): number`

## Example Output

```
Input:  { length: 30, width: 20, height: 15, unit: 'cm' }
Output: {
  volume: 9000,          // cm³
  surfaceArea: 2700,     // cm²
  dimensionalWeight: 1.8 // kg (using divisor 5000)
  unit: 'cm'
}
```

## License

MIT
