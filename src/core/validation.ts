import { BoxInput } from './types';

/** Validates box input dimensions, throwing descriptive errors for invalid values */
export function validateBoxInput(input: BoxInput): void {
  if (!input || typeof input !== 'object') {
    throw new TypeError('Input must be an object');
  }
  const { length, width, height } = input;
  if (length === undefined || length === null) throw new TypeError('length is required');
  if (width === undefined || width === null) throw new TypeError('width is required');
  if (height === undefined || height === null) throw new TypeError('height is required');
  if (typeof length !== 'number' || isNaN(length)) throw new TypeError('length must be a number');
  if (typeof width !== 'number' || isNaN(width)) throw new TypeError('width must be a number');
  if (typeof height !== 'number' || isNaN(height)) throw new TypeError('height must be a number');
  if (length <= 0) throw new RangeError('length must be greater than 0');
  if (width <= 0) throw new RangeError('width must be greater than 0');
  if (height <= 0) throw new RangeError('height must be greater than 0');
}
