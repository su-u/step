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
} as const;
export type OperatorsType = typeof Operators[keyof typeof Operators];

export const RelationalOperatorTokens: ReadonlyArray<
  | typeof Operators.LessThan
  | typeof Operators.Equal
  | typeof Operators.AmountMore
  | typeof Operators.AmountLess
  | typeof Operators.OverThan
> = [
  Operators.LessThan,
  Operators.Equal,
  Operators.AmountMore,
  Operators.AmountLess,
  Operators.OverThan,
];

export const RangeOperatorTokens: ReadonlyArray<any> = [Operators.TildeToken];

export const LogicalOperatorTokens: ReadonlyArray<any> = [Operators.LogicalJoinOperator];
