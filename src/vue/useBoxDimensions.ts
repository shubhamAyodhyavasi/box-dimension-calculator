import { computed, Ref, ComputedRef, isRef } from 'vue';
import { BoxInput, BoxOutput, calculateBox } from '../core';

/**
 * Vue composable for calculating box dimensions.
 * Uses computed properties for reactivity.
 * @param input - Reactive or plain box dimensions
 * @param divisor - Divisor for dimensional weight (default: 5000)
 * @returns Computed box output
 */
export function useBoxDimensions(
  input: Ref<BoxInput> | BoxInput,
  divisor?: number | Ref<number>
): ComputedRef<BoxOutput> {
  return computed(() => {
    const resolvedInput = isRef(input) ? input.value : input;
    const resolvedDivisor = isRef(divisor) ? divisor.value : divisor;
    return calculateBox(resolvedInput, resolvedDivisor);
  });
}
