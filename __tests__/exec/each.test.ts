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
value <- 0
1 ~ 10 |> each (i) {
  value <- value + i
}
value2 <- value
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
value <- 0
1 ~ 10 |> each (i) {
  value <- value + i
  value2 <- i
}
value2 <- value
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




























});
