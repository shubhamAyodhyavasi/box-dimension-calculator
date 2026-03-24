import { useMemo } from 'react';
import { BoxInput, BoxOutput, calculateBox } from '../core';

/**
 * React hook for calculating box dimensions.
 * Returns memoized results that only recompute when input changes.
 * @param input - Box dimensions
 * @param divisor - Divisor for dimensional weight (default: 5000)
 * @returns Calculated box output
 */
export function useBoxDimensions(input: BoxInput, divisor?: number): BoxOutput {
  return useMemo(() => calculateBox(input, divisor), [
    input.length,
    input.width,
    input.height,
    input.unit,
    divisor,
  ]);
}
