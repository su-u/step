import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('array', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1', () => {
    const source = `
[0, 1, 2, 3, 4, 5] -> array
array[0] -> a0
array[1] -> a1
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('array').image.length).toBe(6);
    expect(resultManager.reference('a0')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
    expect(resultManager.reference('a1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('2', () => {
    const source = `
[0, 1, 2, 3, 4, 5] -> array
array[0] -> aa0
array[3] -> a3
aa0 + a3 -> v
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('array').image.length).toBe(6);
    expect(resultManager.reference('array').image[0]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
    expect(resultManager.reference('array').image[1]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
    expect(resultManager.reference('array').image[2]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 2,
    });
    expect(resultManager.reference('array').image[3]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
    expect(resultManager.reference('array').image[4]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 4,
    });
    expect(resultManager.reference('array').image[5]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 5,
    });
    expect(resultManager.reference('aa0')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
    expect(resultManager.reference('a3')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
  });

  test('3', () => {
    const source = `
["s1", "s2", "s3"] -> array
array[0] + array[2] -> str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('array').image.length).toBe(3);
    expect(resultManager.reference('str')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 's1s3',
    });
  });

  test('4', () => {
    const source = `
["s1", "s2", "s3", 10] -> array
array[3] -> a3
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('array').image.length).toBe(4);
    expect(resultManager.reference('a3')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
  });

  test('5', () => {
    const source = `
10 -> v1
100 -> v2
[v1, v2] -> array
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('array').image.length).toBe(2);
    expect(resultManager.reference('v1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
    expect(resultManager.reference('array').image[0]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
    expect(resultManager.reference('array').image[1]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 100,
    });
  });

  test('6', () => {
    const source = `
0 -> index0
1 -> index1
[6, 7, 8, 9, 10] -> array
array[index0] -> a0
array[index1] -> a1
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('array').image.length).toBe(5);
    expect(resultManager.reference('index0')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
    expect(resultManager.reference('index1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
    expect(resultManager.reference('a0')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 6,
    });
    expect(resultManager.reference('a1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 7,
    });
  });
});
