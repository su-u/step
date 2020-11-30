import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('condition number', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1 LessThan', () => {
    const source = `
1 > 0 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('2 OverThan', () => {
    const source = `
1 < 0 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('3 AmountMore', () => {
    const source = `
1 <= 0 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('4 AmountLess', () => {
    const source = `
1 >= 0 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('5 Equal', () => {
    const source = `
1 = 0 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('6 Equal', () => {
    const source = `
1 = 1 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('7 Equal', () => {
    const source = `
1.8 = 1.8 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('8 Equal', () => {
    const source = `
1.8 = 1.8 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });
});

describe('number complexity', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  const testList = [
    [1, 1],
    [`"1"`, 1],
    [false, 1],
  ];

  const operatorsList = [
    '<', '<=', '>', '>=', '=',
  ]

  testList.forEach((testCase, i) => {
    operatorsList.forEach((operator, j) => {
      test(`${i} - ${j}`, () => {
        const source = `
${testCase[0]} ${operator} ${testCase[1]} -> x
  `;
        expect(() => { exec(source, manager) }).not.toThrow();
      });
    });
  });
});