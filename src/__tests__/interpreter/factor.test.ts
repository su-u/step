import { factor } from '../../interpriterRules/factor';
import { FunctionManager, Manager, VariableManager } from '../../manager';
import { LiteralTokens } from '../../tokens';
import { DotsIdentifier, Factor, RangeExpression, RelationExpression } from '../../types/ast';

describe('factor', () => {
  let execObject = {
    manager: null,
    interpreter: () => {},
  };

  beforeEach(() => {
    execObject = {
      manager : {
        variable: new VariableManager(null),
        function: new FunctionManager(),
      } as Manager,
      interpreter: jest.fn(),
    }
  });

  test('1', () => {
    const ast: Factor = {
      name: 'Factor',
      children: {
        NumberLiteral: [
          {
            image: '1',
          },
        ],
      },
    };
    const result = factor({ ast, execObject } as any);
    expect(result).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('2', () => {
    execObject.manager.variable.assignment('value1', {
      name: LiteralTokens.StringLiteral,
      image: 'test1',
    });
    const ast: any = {
      name: 'Factor',
      children: {
        DotsIdentifier: [
          {
            name: "DotsIdentifier",
            children: {
              identifier: [
                {
                  image: "value1"
                }
              ]
            }
          } as DotsIdentifier
        ],
      },
    };
    const result = factor({ ast, execObject }  as any);
    expect(result).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'test1',
    });
  });

  test('3', () => {
    const ast: Factor = {
      name: 'Factor',
      children: {
        BoolLiteral: [
          {
            image: 'true',
          },
        ],
      },
    };
    const result = factor({ ast, execObject } as any);
    expect(result).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'true',
    });
  });

  test('4', () => {
    const ast: Factor = {
      name: 'Factor',
      children: {
        BoolLiteral: [
          {
            image: 'false',
          },
        ],
      },
    };
    const result = factor({ ast, execObject }  as any);
    expect(result).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('5', () => {
    const ast: Factor = {
      name: 'Factor',
      children: {
        BoolLiteral: [
          {
            image: 'false',
          },
        ],
      },
    };
    const result = factor({ ast, execObject } as any);
    expect(result).toStrictEqual({
      name: LiteralTokens.BooleanLiteral,
      image: 'false',
    });
  });

  test('6', () => {
    const ast: Factor= {
      name: 'Factor',
      children: {
        StringLiteral: [
          {
            image: '"test"',
          },
        ],
      },
    };
    const result = factor({ ast, execObject } as any);
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

    const ast: Factor = {
      name: 'Factor',
      children: {
        parentheses: [
          {
            name: 'ParenthesisExpression',
            children: {
              LBrackets: [
                {
                  image: '(',
                },
              ],
              rules: [
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

    const argASt: any = {
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

    const result = factor({ ast, execObject: { manager: execObject.manager, interpreter: interpreterMock } });
    expect(interpreterMock).toBeCalled();
    expect(interpreterMock).toHaveBeenLastCalledWith({
      ast: argASt,
      execObject: { manager: execObject.manager, interpreter: interpreterMock },
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
    const result = factor({ ast, execObject } as any);
    expect(result).toStrictEqual({
      name: LiteralTokens.DebugLiteral,
      image: null,
    });
  });
});
