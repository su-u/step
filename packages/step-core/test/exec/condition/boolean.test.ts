import { exec } from '../../../src/util/test';
import { FunctionManager, VariableManager } from '../../../src/manager';
import { LiteralTokens } from '../../../src/tokens';

describe('condition number', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  test('1 Equal', () => {
    const source = `
true = true -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('2 Equal', () => {
    const source = `
true = false -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('3', () => {
    const source = `
1~10 -> y1
10 -> y2

y1 = y2 -> x
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('x')).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });
});

describe('boolean complexity', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });

  const testList = [
    [1, false],
    [`"1"`, false],
    [false, false],
  ];

  const operatorsList = ['=', 'and', 'or'];

  testList.forEach((testCase, i) => {
    operatorsList.forEach((operator, j) => {
      test(`${i} - ${j}`, () => {
        const source = `
${testCase[0]} ${operator} ${testCase[1]} -> x
  `;
        expect(() => {
          exec(source, manager);
        }).not.toThrow();
      });
    });
  });
});
