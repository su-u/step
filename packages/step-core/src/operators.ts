export const Operators = {
  MultiplicationOperators: 'MultiplicationOperators',
  AdditionOperators: 'AdditionOperators',
  TildeToken: 'TildeToken',
  LessThan: 'LessThan',
  Equal: 'Equal',
  AmountMore: 'AmountMore',
  AmountLess: 'AmountLess',
  OverThan: 'OverThan',
  LogicalJoinOperators: 'LogicalJoinOperators',
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

export const RangeOperatorTokens: ReadonlyArray<typeof Operators.TildeToken> = [
  Operators.TildeToken,
];

export const LogicalOperatorTokens: ReadonlyArray<typeof Operators.LogicalJoinOperators> = [
  Operators.LogicalJoinOperators,
];
