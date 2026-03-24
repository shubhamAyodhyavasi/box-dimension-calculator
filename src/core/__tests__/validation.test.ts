import { describe, it, expect } from 'vitest';
import { validateBoxInput } from '../validation';

describe('validateBoxInput', () => {
  it('does not throw for valid input', () => {
    expect(() => validateBoxInput({ length: 1, width: 1, height: 1 })).not.toThrow();
  });

  it('throws TypeError for missing length', () => {
    expect(() => validateBoxInput({ length: undefined as any, width: 1, height: 1 })).toThrow(TypeError);
  });

  it('throws TypeError for missing width', () => {
    expect(() => validateBoxInput({ length: 1, width: undefined as any, height: 1 })).toThrow(TypeError);
  });

  it('throws TypeError for missing height', () => {
    expect(() => validateBoxInput({ length: 1, width: 1, height: undefined as any })).toThrow(TypeError);
  });

  it('throws RangeError for negative length', () => {
    expect(() => validateBoxInput({ length: -1, width: 1, height: 1 })).toThrow(RangeError);
  });

  it('throws RangeError for negative width', () => {
    expect(() => validateBoxInput({ length: 1, width: -1, height: 1 })).toThrow(RangeError);
  });

  it('throws RangeError for negative height', () => {
    expect(() => validateBoxInput({ length: 1, width: 1, height: -1 })).toThrow(RangeError);
  });

  it('throws RangeError for zero length', () => {
    expect(() => validateBoxInput({ length: 0, width: 1, height: 1 })).toThrow(RangeError);
  });

  it('throws TypeError for NaN value', () => {
    expect(() => validateBoxInput({ length: NaN, width: 1, height: 1 })).toThrow(TypeError);
  });

  it('throws TypeError for non-object input', () => {
    expect(() => validateBoxInput(null as any)).toThrow(TypeError);
  });
});
