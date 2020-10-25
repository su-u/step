import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('if', () => {
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
if: x {
  x + x
}
    `;
    exec(source, manager);
  });

  test('2', () => {
    const source = `
x <- 1
if: x {
  x + x
} else {
  x - x
}
    `;
    exec(source, manager);
  });

  test('3', () => {
    const source = `
value <- 0
x <- 1
if: x {
  1 ~ 10 |> each: i {
    value <- 10
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
value1 <- 1
if: true {
  value1 <- 2
  value2 <- 1
}
    `;
    const resultManager = exec(source, manager).variable;
    expect(() => {
      resultManager.reference('value2');
    }).toThrowError();
  });

  test('5', () => {
    const source = `
function judge: x, y {
  return x = y
}

0 -> value1
if: { 1, 1 } |> judge  {
  1 -> value1
} else {
  2 -> value1
}
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });
});
