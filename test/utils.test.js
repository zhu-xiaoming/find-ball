// @ts-nocheck
import utils from '../src/utils';

describe('getReverseNum', () => {
  test('getReverseNum("012")', () => {
    expect(utils.getReverseNum('012')).toBe('210');
  });
  test('getReverseNum("102")', () => {
    expect(utils.getReverseNum('102')).toBe('120');
  });
});

describe('getGroupNum', () => {
  test('getGroupNum("012")', () => {
    expect(utils.getGroupNum('012')).toEqual(['012', '120', '201']);
  });
  test('getGroupNum("001")', () => {
    expect(utils.getGroupNum('001')).toEqual(['001', '112', '220']);
  });
});

describe('convertNum', () => {
  test('convertNum(5)', () => {
    expect(utils.convertNum(5)).toBe(12);
  });
  test('convertNum(5, 5)', () => {
    expect(utils.convertNum(5, 5)).toBe(10);
  });
});

describe('getAllNum', () => {
  test('getAllNum(1)', () => {
    expect(utils.getAllNum(1)).toEqual(['0', '1', '2']);
  });

  test('getAllNum(2)', () => {
    expect(utils.getAllNum(2)).toEqual([
      '00',
      '01',
      '02',
      '10',
      '11',
      '12',
      '20',
      '21',
      '22',
    ]);
  });
});

describe('generateZeroNum', () => {
  test('generateZeroNum(1)', () => {
    expect(() => {
      utils.generateZeroNum(1);
    }).toThrowError('位数必须大于或等于 2');
  });
  test('generateZeroNum(2)', () => {
    expect(utils.generateZeroNum(2)).toEqual(['01']);
  });
  test('generateZeroNum(3)', () => {
    expect(utils.generateZeroNum(3)).toEqual(['010', '011', '012', '001']);
  });
  test('generateZeroNum(3, 4)', () => {
    expect(utils.generateZeroNum(3, 4)).toEqual([
      '010',
      '011',
      '012',
      '013',
      '001',
    ]);
  });
});
