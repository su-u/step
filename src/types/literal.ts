export declare type BaseLiteralType = {
  readonly name: 'NumberLiteral' | 'StringLiteral' | 'Identifier';
};

export declare type LiteralType<T> = {
  readonly image: T;
} & BaseLiteralType;

export declare type AllLiteralType =
  | LiteralType<string>
  | LiteralType<number>
  | LiteralType<boolean>
  | LiteralType<null>;
