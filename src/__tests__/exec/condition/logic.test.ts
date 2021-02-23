import { exec } from '../../../util/test';
import { FunctionManager, VariableManager } from '../../../manager';
import { LiteralTokens } from '../../../tokens';

describe('condition logic', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1', () => {
    const source = `
"test" = "test" and 1 = 1 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('2', () => {
    const source = `
"test" = "test" or 1 = 2 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('3', () => {
    const source = `
"test" = "test1" or 1 = 1 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('4', () => {
    const source = `
"test" = "test" and 1 = 12 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('5', () => {
    const source = `
("test" = "test" and 1 = 12) or true  -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('6', () => {
    const source = `
"test" = "test" or 1 = 12 or 1 > 2 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('7', () => {
    const source = `
("test" = "test" or 1 = 12 or 1 > 2 or 12 < 50) and 8 > 1  -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('8', () => {
    const source = `
1 and 1 -> x
    `;
    expect(() => exec(source, manager).variable).toThrowError();
  });

  test('9', () => {
    const source = `
"test" = "test" and 1 -> x
    `;
    expect(() => exec(source, manager).variable).toThrowError();
  });
});
