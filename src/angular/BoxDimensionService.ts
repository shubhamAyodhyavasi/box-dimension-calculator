import { Injectable } from '@angular/core';
import { BoxInput, BoxOutput, calculateBox, getVolume, getSurfaceArea, getDimensionalWeight } from '../core';

/**
 * Angular injectable service for calculating box dimensions.
 * Inject this service into your components or other services.
 */
@Injectable({
  providedIn: 'root',
})
export class BoxDimensionService {
  /**
   * Calculates all box dimensions at once.
   * @param input - Box dimensions
   * @param divisor - Divisor for dimensional weight (default: 5000)
   */
  calculate(input: BoxInput, divisor?: number): BoxOutput {
    return calculateBox(input, divisor);
  }

  /**
   * Calculates the volume of a box.
   * @param input - Box dimensions
   */
  getVolume(input: BoxInput): number {
    return getVolume(input);
  }

  /**
   * Calculates the surface area of a box.
   * @param input - Box dimensions
   */
  getSurfaceArea(input: BoxInput): number {
    return getSurfaceArea(input);
  }

  /**
   * Calculates the dimensional weight of a box.
   * @param input - Box dimensions
   * @param divisor - Divisor for dimensional weight (default: 5000)
   */
  getDimensionalWeight(input: BoxInput, divisor?: number): number {
    return getDimensionalWeight(input, divisor);
  }
}
