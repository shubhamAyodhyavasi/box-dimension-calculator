import { BoxInput, BoxOutput, BoxUnit } from './types';
import { validateBoxInput } from './validation';

/** Default dimensional weight divisor (5000 for cm, 139 for inch) */
const DEFAULT_DIVISOR = 5000;

/**
 * Calculates the volume of a box.
 * @param input - Box dimensions
 * @returns Volume in cubic units
 */
export function getVolume(input: BoxInput): number {
  validateBoxInput(input);
  return input.length * input.width * input.height;
}

/**
 * Calculates the total surface area of a box.
 * @param input - Box dimensions
 * @returns Surface area in square units
 */
export function getSurfaceArea(input: BoxInput): number {
  validateBoxInput(input);
  const { length, width, height } = input;
  return 2 * (length * width + width * height + height * length);
}

/**
 * Calculates the dimensional (volumetric) weight of a box.
 * @param input - Box dimensions
 * @param divisor - Divisor used for dimensional weight calculation (default: 5000)
 * @returns Dimensional weight
 */
export function getDimensionalWeight(input: BoxInput, divisor: number = DEFAULT_DIVISOR): number {
  validateBoxInput(input);
  if (divisor <= 0) throw new RangeError('divisor must be greater than 0');
  return getVolume(input) / divisor;
}

/**
 * Calculates all box dimensions at once.
 * @param input - Box dimensions
 * @param divisor - Divisor used for dimensional weight calculation (default: 5000)
 * @returns Object containing volume, surfaceArea, and dimensionalWeight
 */
export function calculateBox(input: BoxInput, divisor: number = DEFAULT_DIVISOR): BoxOutput {
  validateBoxInput(input);
  return {
    volume: getVolume(input),
    surfaceArea: getSurfaceArea(input),
    dimensionalWeight: getDimensionalWeight(input, divisor),
    unit: (input.unit ?? 'cm') as BoxUnit,
  };
}
