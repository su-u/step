import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

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
