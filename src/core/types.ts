/** Unit of measurement for box dimensions */
export type BoxUnit = 'cm' | 'inch';

/** Input dimensions for a single box */
export interface BoxInput {
  /** Length of the box */
  length: number;
  /** Width of the box */
  width: number;
  /** Height of the box */
  height: number;
  /** Unit of measurement (default: 'cm') */
  unit?: BoxUnit;
}

/** Calculated output for a box */
export interface BoxOutput {
  /** Volume in cubic units */
  volume: number;
  /** Total surface area in square units */
  surfaceArea: number;
  /** Dimensional weight (volumetric weight) */
  dimensionalWeight: number;
  /** Unit used for calculation */
  unit: BoxUnit;
}
