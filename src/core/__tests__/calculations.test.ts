import { describe, it, expect } from 'vitest';
import { calculateBox, getVolume, getSurfaceArea, getDimensionalWeight } from '../calculations';

describe('getVolume', () => {
  it('calculates volume correctly', () => {
    expect(getVolume({ length: 10, width: 5, height: 2 })).toBe(100);
  });

  it('calculates volume with all equal sides', () => {
    expect(getVolume({ length: 3, width: 3, height: 3 })).toBe(27);
  });
});

describe('getSurfaceArea', () => {
  it('calculates surface area correctly', () => {
    // 2*(10*5 + 5*2 + 2*10) = 2*(50 + 10 + 20) = 160
    expect(getSurfaceArea({ length: 10, width: 5, height: 2 })).toBe(160);
  });

  it('calculates surface area for a cube', () => {
    // 2*(3*3 + 3*3 + 3*3) = 54
    expect(getSurfaceArea({ length: 3, width: 3, height: 3 })).toBe(54);
  });
});

describe('getDimensionalWeight', () => {
  it('calculates dimensional weight with default divisor', () => {
    // 10*5*2 / 5000 = 0.02
    expect(getDimensionalWeight({ length: 10, width: 5, height: 2 })).toBeCloseTo(0.02);
  });

  it('calculates dimensional weight with custom divisor', () => {
    expect(getDimensionalWeight({ length: 10, width: 5, height: 2 }, 100)).toBe(1);
  });

  it('throws for non-positive divisor', () => {
    expect(() => getDimensionalWeight({ length: 10, width: 5, height: 2 }, 0)).toThrow(RangeError);
  });
});

describe('calculateBox', () => {
  it('returns all calculations at once', () => {
    const result = calculateBox({ length: 10, width: 5, height: 2 });
    expect(result.volume).toBe(100);
    expect(result.surfaceArea).toBe(160);
    expect(result.dimensionalWeight).toBeCloseTo(0.02);
    expect(result.unit).toBe('cm');
  });

  it('uses provided unit in output', () => {
    const result = calculateBox({ length: 10, width: 5, height: 2, unit: 'inch' });
    expect(result.unit).toBe('inch');
  });
});
