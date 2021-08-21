export type BooleanLiteralType = {
  readonly name: 'BooleanLiteral';
  image: string;
};

export type NumberLiteralType = {
  readonly name: 'NumberLiteral';
  image: number;
};

export type StringLiteralType = {
  readonly name: 'StringLiteral';
  image: string;
};

export type IdentifierType = {
  readonly name: 'Identifier';
  image: string;
};

export type DebugLiteralType = {
  readonly name: 'DebugLiteral';
  image: null;
};

export type NumberLiteralRangeType = {
  readonly name: 'NumberLiteralRange';
  start: number;
  end: number;
};

export type ArrayLiteralType = {
  readonly name: 'ArrayLiteral';
  image: Array<AllLiteralType>;
};

export type AllLiteralType =
  | BooleanLiteralType
  | NumberLiteralType
  | StringLiteralType
  | IdentifierType
  | DebugLiteralType
  | NumberLiteralRangeType
  | ArrayLiteralType;
