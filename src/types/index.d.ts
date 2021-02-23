export declare type BooleanLiteralType = {
  readonly name: 'BooleanLiteral';
  image: string;
};

export declare type NumberLiteralType = {
  readonly name: 'NumberLiteral';
  image: number;
};

export declare type StringLiteralType = {
  readonly name: 'StringLiteral';
  image: string;
};

export declare type IdentifierType = {
  readonly name: 'Identifier';
  image: string;
};

export declare type DebugLiteralType = {
  readonly name: 'DebugLiteral';
  image: null;
};

export declare type NumberLiteralRangeType = {
  readonly name: 'NumberLiteralRange';
  start: number;
  end: number;
};

export declare type ArrayLiteralType = {
  readonly name: 'ArrayLiteral';
  image: Array<AllLiteralType>;
};

export declare type AllLiteralType =
  | BooleanLiteralType
  | NumberLiteralType
  | StringLiteralType
  | IdentifierType
  | DebugLiteralType
  | NumberLiteralRangeType
  | ArrayLiteralType;
