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
    expect(findBall([1, 1, 2], times)).toEqual({
      theBallIndex: 2,
      theBallNum: '20',
      num: ['01', '12', '20'],
      weighProcess: [{
        leftIndex: [0],
        rightIndex: [2],
        otherIndex: [1],
      }, {
        leftIndex: [2],
        rightIndex: [1],
        otherIndex: [0],
      }],
    });
  });
  function one(arr) {
    return arr.map((e) => ({
      leftIndex: e.leftIndex.map(elem => elem - 1),
      rightIndex: e.rightIndex.map(elem => elem - 1),
      otherIndex: e.otherIndex.map(elem => elem - 1),
    }));
  }
  test('findBall(6)', () => {
    const times = getTimes(6);
    expect(findBall([1, 2, 1, 1, 1, 1], times)).toEqual({
      theBallIndex: 1,
      theBallNum: '121',
      num: ['010', '121', '202', '011', '122', '200'],
      weighProcess: one([{
        leftIndex: [1, 4],
        rightIndex: [3, 6],
        otherIndex: [2, 5],
      }, {
        leftIndex: [3, 6],
        rightIndex: [2, 5],
        otherIndex: [1, 4],
      }, {
        leftIndex: [1, 6],
        rightIndex: [3, 5],
        otherIndex: [2, 4],
      }]),
    });
  });
  test('findBall(7)', () => {
    const times = getTimes(7);
    expect(findBall([1, 1, 1, 2, 1, 1, 1], times)).toEqual({
      theBallIndex: 3,
      theBallNum: '011',
      num: ['010', '121', '202', '011', '122', '200', '120', '012', '201'],
      weighProcess: one([{
        leftIndex: [1, 4, 8],
        rightIndex: [3, 6, 9],
        otherIndex: [2, 5, 7],
      }, {
        leftIndex: [3, 6, 9],
        rightIndex: [2, 5, 7],
        otherIndex: [1, 4, 8],
      }, {
        leftIndex: [1, 6, 7],
        rightIndex: [3, 5, 8],
        otherIndex: [2, 4, 9],
      }]),
    });
  });
  test('findBall(8)', () => {
    const times = getTimes(8);
    expect(findBall([1, 1, 1, 1, 0, 1, 1, 1], times)).toEqual({
      theBallIndex: 4,
      theBallNum: '100',
      num: ['010', '121', '202', '011', '122', '200', '012', '201', '120'],
      weighProcess: one([{
        leftIndex: [1, 4, 7],
        rightIndex: [3, 6, 8],
        otherIndex: [2, 5, 9],
      }, {
        leftIndex: [3, 6, 8],
        rightIndex: [2, 5, 9],
        otherIndex: [1, 4, 7],
      }, {
        leftIndex: [1, 6, 9],
        rightIndex: [3, 5, 7],
        otherIndex: [2, 4, 8],
      }]),
    });
  });
});
