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

  test('1', () => {
    const source = `
x <- "test" = "test"
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('2', () => {
    const source = `
x <- "test1" = "test"
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('3', () => {
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

  test('4', () => {
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

  test('5', () => {
    const source = `
str <- "test1"
x <- "test" > str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('6', () => {
    const source = `
str <- "test1"
x <- "test" < str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('7', () => {
    const source = `
str <- "test1"
x <- "test" <= str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('7', () => {
    const source = `
str <- "test1"
x <- "test" >= str
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });
});
