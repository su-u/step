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
1 -> x
if (x) {
  x + x
}
    `;
    exec(source, manager);
  });

  test('2', () => {
    const source = `
1 -> x
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
0 -> value
1 -> x
if (x) {
  1 ~ 10 |> each (i) {
    10 -> value
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
1 -> value1
if (true) {
  2 -> value1
  1 -> value2
}
    `;
    const resultManager = exec(source, manager).variable;
    expect(() => {
      resultManager.reference('value2');
    }).toThrowError();
  });

  test('5', () => {
    const source = `
function judge(x, y) {
  return x = y
}

0 -> value1
if ({ 1, 1 } |> judge)  {
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

  test('6', () => {
    const source = `
0 -> value
if (false) {
  1 -> value
}
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
  });

  test('6', () => {
    const source = `
0 -> value
if (1) {
  1 -> value
}
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('7', () => {
    const source = `
0 -> value
if (0) {
  1 -> value
}
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
  });
});
