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

  test('5', () => {
    const source = `
[ 30, 50, 15 ] -> data
0 -> all
data |> each (i) {
  all + i -> all
}
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('all')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 95,
    });
    expect(resultManager.reference('data').image.length).toBe(3);
    expect(resultManager.reference('data').image[0]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 30,
    });
    expect(resultManager.reference('data').image[1]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 50,
    });
    expect(resultManager.reference('data').image[2]).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 15,
    });
  });
});
