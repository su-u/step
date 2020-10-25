export const Operators = {
  MultiplicationOperator: 'MultiplicationOperator',
  AdditionOperator: 'AdditionOperator',
  TildeToken: 'TildeToken',
  LessThan: 'LessThan',
  Equal: 'Equal',
  AmountMore: 'AmountMore',
  AmountLess: 'AmountLess',
  OverThan: 'OverThan',
  LogicalOperator: 'LogicalOperator',
};

export const RelationalOperatorTokens: ReadonlyArray<any> = [
  Operators.TildeToken,
  Operators.LessThan,
  Operators.Equal,
  Operators.AmountMore,
  Operators.AmountLess,
  Operators.OverThan,
  Operators.LogicalOperator,
];

export const LogicalOperatorTokens: ReadonlyArray<any> = [
  Operators.LogicalOperator,
]