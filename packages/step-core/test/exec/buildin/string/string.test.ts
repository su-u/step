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
1.5 |> string -> str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('str')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: '1.5',
    });
  });

  test('2', () => {
    const source = `
"mozi" |> string -> str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('str')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'mozi',
    });
  });

  test('3', () => {
    const source = `
true |> string -> str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('str')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'true',
    });
  });
});
