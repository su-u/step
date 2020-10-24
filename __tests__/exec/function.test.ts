import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('関数', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });
  test('1', () => {
    const source = `
      function myFunc: {
        1 + 1
      }
    `;
    exec(source, manager);
  });

  test('2', () => {
    const source = `
      function add: x, y {
        return x + y
      }
    `;
    exec(source, manager);
  });

  test('3', () => {
    const source = `
      function func: x, y {
        value <- 1 + 2
        return value
      }
      { 1, 2 } |> func |> result
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
  });

  test('4', () => {
    const source = `
      function out: str {
        return str
      }
      "testword" |> out -> re
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'testword',
    });
  });

  test('5', () => {
    const source = `
      function out: str {
        return str + "gg"
      }
      "testword" |> out -> re
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'testwordgg',
    });
  });

  test('6', () => {
    const source = `
      function out: str {
        return str + "ggg"
      }
      { "testword" } |> out -> re
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'testwordggg',
    });
  });



































});
