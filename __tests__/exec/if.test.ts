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
      x <- 1
      if (x) {
        x + x
      }
    `;
    exec(source, manager);
  });

  test('2', () => {
    const source = `
      x <- 1
      if (x) {
        x + x
      } else {
        x - x
      }
    `;
    exec(source, manager);
  });

  test('3', () => {
    const source = `
      x <- 1
      if (x) {
        1 ~ 10 |> each (i) {
        }
      } else {
        x - x
      }
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
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































});
