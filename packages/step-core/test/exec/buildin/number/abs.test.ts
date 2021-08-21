import { exec } from '../../../../src/util/test';
import { FunctionManager, VariableManager } from '../../../../src/manager';
import { LiteralTokens } from '../../../../src/tokens';

describe('condition number abs', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1', () => {
    const source = `
1.5 |> abs -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1.5,
    });
  });

  test('2', () => {
    const source = `
1 |> abs -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('3', () => {
    const source = `
-1.9 |> abs -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1.9,
    });
  });

  test('4', () => {
    const source = `
-1500 |> abs -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1500,
    });
  });

  test('4', () => {
    const source = `
(100 - 1500) |> abs -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1400,
    });
  });

  test('5', () => {
    const source = `
"test" |> abs -> num
    `;
    expect(() => {
      exec(source, manager).variable;
    }).toThrowError();
  });
});
