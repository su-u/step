import { exec } from '../../../../src/util/test';
import { FunctionManager, VariableManager } from '../../../../src/manager';
import { LiteralTokens } from '../../../../src/tokens';

describe('condition number int', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1', () => {
    const source = `
1.5 |> int -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('2', () => {
    const source = `
1 |> int -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('3', () => {
    const source = `
-1.9 |> int -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: -1,
    });
  });
});
