export const Operators = {
  MultiplicationOperator: 'MultiplicationOperator',
  AdditionOperator: 'AdditionOperator',
  TildeToken: 'TildeToken',
  LessThan: 'LessThan',
  Equal: 'Equal',
  AmountMore: 'AmountMore',
  AmountLess: 'AmountLess',
  OverThan: 'OverThan',
  LogicalJoinOperator: 'LogicalJoinOperator',
};

export const RelationalOperatorTokens: ReadonlyArray<any> = [
  Operators.TildeToken,
  Operators.LessThan,
  Operators.Equal,
  Operators.AmountMore,
  Operators.AmountLess,
  Operators.OverThan,
];

export const RangeOperatorTokens: ReadonlyArray<any> = [Operators.TildeToken];

export const LogicalOperatorTokens: ReadonlyArray<any> = [Operators.LogicalJoinOperator];
