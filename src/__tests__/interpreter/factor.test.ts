import { factor } from '@/interpriterRules/factor';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('factor', () => {
  let manager = null;
  let execObject = {
    interpreter: () => {},
  };

  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
    execObject.interpreter = jest.fn();
  });

  test('1', () => {
    const ast = {
      name: 'Factor',
      children: {
        NumberLiteral: [
          {
            image: '1',
          },
        ],
      },
    };
    const result = factor({ ast, manager, execObject });
    expect(result).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('2', () => {
    manager.variable.assignment('value1', {
      name: LiteralTokens.StringLiteral,
      image: 'test1',
    });
    const ast = {
      name: 'Factor',
      children: {
        Identifier: [
          {
            image: 'value1',
          },
        ],
      },
    };
    const result = factor({ ast, manager, execObject });
    expect(result).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'test1',
    });
  });

  test('3', () => {
    const ast = {
      name: 'Factor',
      children: {
        BoolLiteral: [
          {
            image: 'true',
          },
        ],
      },
    };
    const result = factor({ ast, manager, execObject });
    expect(result).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('4', () => {
    const ast = {
      name: 'Factor',
      children: {
        BoolLiteral: [
          {
            image: 'false',
          },
        ],
      },
    };
    const result = factor({ ast, manager, execObject });
    expect(result).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('5', () => {
    const ast = {
      name: 'Factor',
      children: {
        BoolLiteral: [
          {
            image: 'false',
          },
        ],
      },
    };
    const result = factor({ ast, manager, execObject });
    expect(result).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('6', () => {
    const ast = {
      name: 'Factor',
      children: {
        StringLiteral: [
          {
            image: '"test"',
          },
        ],
      },
    };
    const result = factor({ ast, manager, execObject });
    expect(result).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'test',
    });
  });

  test('7', () => {
    const interpreterMock = jest.fn();
    const correct = {
      name: LiteralTokens.NumberLiteral,
      image: 2,
    };

    interpreterMock.mockReturnValue(correct);

    const ast = {
      name: 'Factor',
      children: {
        ParenthesisExpression: [
          {
            name: 'ParenthesisExpression',
            children: {
              LBrackets: [
                {
                  image: '(',
                },
              ],
              expression: [
                {
                  name: 'RelationExpression',
                  children: {
                    Expression: [
                      {
                        name: 'Expression',
                        children: {
                          Term: [
                            {
                              name: 'Term',
                              children: {
                                Factor: [
                                  {
                                    name: 'Factor',
                                    children: {
                                      NumberLiteral: [
                                        {
                                          image: '1',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    name: 'Factor',
                                    children: {
                                      NumberLiteral: [
                                        {
                                          image: '2',
                                        },
                                      ],
                                    },
                                  },
                                ],
                                MultiplicationOperator: [
                                  {
                                    image: '*',
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
              RBrackets: [
                {
                  image: ')',
                },
              ],
            },
          },
        ],
      },
    };

    const argASt = {
      name: 'RelationExpression',
      children: {
        Expression: [
          {
            name: 'Expression',
            children: {
              Term: [
                {
                  name: 'Term',
                  children: {
                    Factor: [
                      {
                        name: 'Factor',
                        children: {
                          NumberLiteral: [
                            {
                              image: '1',
                            },
                          ],
                        },
                      },
                      {
                        name: 'Factor',
                        children: {
                          NumberLiteral: [
                            {
                              image: '2',
                            },
                          ],
                        },
                      },
                    ],
                    MultiplicationOperator: [
                      {
                        image: '*',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const result = factor({ ast, manager, execObject: { interpreter: interpreterMock } });
    expect(interpreterMock).toBeCalled();
    expect(interpreterMock).toHaveBeenLastCalledWith({
      ast: argASt,
      manager,
      execObject: { interpreter: interpreterMock },
    });
    expect(result).toStrictEqual(correct);
  });

  test('8', () => {
    const ast = {
      name: 'Factor',
      children: {
        TestLiteral: [
          {
            image: 'true',
          },
        ],
      },
    };
    const result = factor({ ast, manager, execObject });
    expect(result).toStrictEqual({
      name: LiteralTokens.DebugLiteral,
      image: null,
    });
  });
});
