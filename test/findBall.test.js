// @ts-nocheck
import findBall, { getTimes } from '../src/findBall';

describe('getTimes', () => {
  test('getTimes(3)', () => {
    expect(getTimes(3)).toBe(2);
  });
  test('getTimes(6)', () => {
    expect(getTimes(6)).toBe(3);
  });
  test('getTimes(12)', () => {
    expect(getTimes(12)).toBe(3);
  });
  test('getTimes(13)', () => {
    expect(getTimes(13)).toBe(4);
  });
});

describe('findBall', () => {
  test('findBall(3)', () => {
    const times = getTimes(3);
    expect(findBall([1, 1, 2], times, 1)).toBe(2);
  });
  test('findBall(6)', () => {
    const times = getTimes(6);
    expect(findBall([1, 2, 1, 1, 1, 1], times, 1)).toBe(1);
  });
  test('findBall(7)', () => {
    const times = getTimes(7);
    expect(findBall([1, 1, 1, 2, 1, 1, 1], times, 1)).toBe(3);
  });
  test('findBall(8)', () => {
    const times = getTimes(8);
    expect(findBall([1, 1, 1, 1, 0, 1, 1, 1], times, 1)).toBe(4);
  });
});
