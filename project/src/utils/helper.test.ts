import { getWidthByRating, isValidPassword } from './helper';

describe('Helper tests', () => {
  it('should be correct round', () => {
    expect(getWidthByRating(0.4)).toBeCloseTo(0, 2);
    expect(getWidthByRating(0.5)).toBeCloseTo(14.6, 2);
    expect(getWidthByRating(1.4)).toBeCloseTo(14.6, 2);
    expect(getWidthByRating(1.5)).toBeCloseTo(29.2, 2);
    expect(getWidthByRating(2.4)).toBeCloseTo(29.2, 2);
    expect(getWidthByRating(2.5)).toBeCloseTo(43.8, 2);
    expect(getWidthByRating(3.4)).toBeCloseTo(43.8, 2);
    expect(getWidthByRating(3.5)).toBeCloseTo(58.4, 2);
    expect(getWidthByRating(4.4)).toBeCloseTo(58.4, 2);
    expect(getWidthByRating(4.5)).toBeCloseTo(73, 2);
  });

  it('valid password must have one letter and one number', () => {
    expect(isValidPassword('    ')).toBe(false);
    expect(isValidPassword('123123')).toBe(false);
    expect(isValidPassword('sdfsdf')).toBe(false);
    expect(isValidPassword('s')).toBe(false);
    expect(isValidPassword('3')).toBe(false);
    expect(isValidPassword('3f')).toBe(true);
  });
});
