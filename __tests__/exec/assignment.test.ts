import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('変数', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });
  test('1', () => {
    const source = `
"string" -> value
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'string',
    });
  });

  test('2', () => {
    const source = `
1 -> value
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('3', () => {
    const source = `
1 + 1 -> value
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 2,
    });
  });

  test('4', () => {
    const source = `
val <- "Switch"
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('val')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'Switch',
    });
  });

  test('5', () => {
    const source = `
aaa <- 1
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('aaa')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('6', () => {
    const source = `
val <- "str"
aaa <- val + "aaa"
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('val')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'str',
    });
    expect(resultManager.reference('aaa')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'straaa',
    });
  });

  test('7', () => {
    const source = `
v <- 1 ~ 10
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteralRange,
      start: 1,
      end: 10,
    });
  });
});
