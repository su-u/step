import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('condition number', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1 Equal', () => {
    const source = `
x <- "test" = "test"
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('2 Equal', () => {
    const source = `
x <- "test1" = "test"
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('3 Equal', () => {
    const source = `
str <- "test"
x <- "test" = str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('4 Equal', () => {
    const source = `
str <- "test1"
x <- "test" = str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

});
