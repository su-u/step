import { exec } from '../../src/util/test';
import { FunctionManager, VariableManager } from '../../src/manager';
import { LiteralTokens } from '../../src/tokens';

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
"Switch" -> val

      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('val')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'Switch',
    });
  });

  test('5', () => {
    const source = `
1 -> aaa
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('aaa')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('6', () => {
    const source = `
"str" -> val
val + "aaa" -> aaa
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
1 ~ 10 -> v
      `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteralRange,
      start: 1,
      end: 10,
    });
  });
});
