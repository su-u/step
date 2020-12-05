import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('match', () => {
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
value |> match {
  (0) => { return 1 },
  () => { return 2 }
} -> value2
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('2', () => {
    const source = `
1 -> value
value |> match {
  (0) => { return 1 },
  () => { return 2 }
} -> value2
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 2,
    });
  });

  test('3', () => {
    const source = `
2 -> x
3 -> y

{ x, y } |> match {
  (1, 2) => { return 0 },
  (2, 3) => { return 10 },
  () => { return 20 }
} -> v
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 2,
    });
    expect(resultManager.reference('y')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
  });

  test('4', () => {
    const source = `
3 -> x
3 -> y

{ x, y } |> match {
  (1, 2) => { return 0 },
  (2, 3) => { return 10 },
  () => { return 20 }
} -> v
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
    expect(resultManager.reference('y')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 20,
    });
  });

  test('5', () => {
    const source = `
1 ~ 10-> x

{ x } |> match {
  (1, 10) => { return 0 },
  (1 ~ 10) => { return 10 },
  () => { return 20 }
} -> v
     `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.NumberLiteralRange,
      start: 1,
      end: 10,
    });
    expect(resultManager.reference('v')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
  });

    test('6', () => {
      const source = `
  0 -> v
  10 |> match {
    (5) => { return 1 ~ 5 },
    (10) => { return 1 ~ 10 },
    () => { return 20 }
  } |> each (i) {
    v + i -> v
  }
       `;
      const resultManager = exec(source, manager).variable;
      expect(resultManager.reference('v')).toStrictEqual({
        name: LiteralTokens.NumberLiteral,
        image: 55,
      });
    });
});
