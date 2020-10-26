import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('演算', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1', () => {
    const source = `
1 + 1 -> value
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 2,
    });
  });

  test('2', () => {
    const source = `
1 - 1 -> value
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
  });

  test('3', () => {
    const source = `
1 * 3 -> value
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
  });

  test('4', () => {
    const source = `
10 / 2 -> value
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 5,
    });
  });

  test('5', () => {
    const source = `
1 + 1 + 1 + 1 -> aaa
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('aaa')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 4,
    });
  });

  test('6', () => {
    const source = `
(1 + 1) * 3 -> val
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('val')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 6,
    });
  });

  test('7', () => {
    const source = `
(10 * 10) / (2 * 10) -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 5,
    });
  });

  test('8', () => {
    const source = `
(10 * 10) / (2 * 10) -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 5,
    });
  });

  test('9', () => {
    const source = `
(10 * 10) / (2 * (11 - 1)) -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 5,
    });
  });

  test('10', () => {
    const source = `
1 * 2 * 3 * 4 -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 24,
    });
  });

  test('11', () => {
    const source = `
1 * 2 * 3 * 4 + 6 -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 30,
    });
  });

  test('12', () => {
    const source = `
1 + 1 * 5 -> v1
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 6,
    });
  });

  test('13', () => {
    const source = `
1 + 1 * 5 -> v1
1 * 2 * 3 * 4 + 6 -> v2
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 6,
    });
    expect(resultManager.reference('v2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 30,
    });
  });

  test('14', () => {
    const source = `
(10 * 10 * 10) / (2 * (11 - 1)) -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 50,
    });
  });

  test('15', () => {
    const source = `
"100" + 1 -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: '1001',
    });
  });

  test('16', () => {
    const source = `
1 + "100" -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: '1100',
    });
  });
});
