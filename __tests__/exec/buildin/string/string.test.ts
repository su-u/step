import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

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
