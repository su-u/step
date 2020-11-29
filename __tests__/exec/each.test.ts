import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('each', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1', () => {
    const source = `
0 -> value
1 ~ 10 |> each (i) {
  value + i -> value
}
value -> value2
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 55,
    });
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 55,
    });
  });

  test('2', () => {
    const source = `
0 -> value
1 ~ 10 |> each (i) {
  value + i -> value
  i -> value2
}
value -> value2
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 55,
    });
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 55,
    });
  });

  test('3', () => {
    const source = `
0 -> value
1 ~ 10 -> range
range |> each (i) {
  range |> each (j) {
    value + j -> value
  }
}
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 550,
    });
  });

  test('4', () => {
    const source = `
0 -> value
1 ~ 10 |> each {
  value + 1 -> value
}
value -> value2
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
  });
});
