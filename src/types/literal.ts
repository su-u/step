declare type BaseLiteralType = {
  readonly name: 'NumberLiteral' | 'Identifier';
};

declare type LiteralType<T> = {
  readonly image: T;
} & BaseLiteralType;

declare type AllLiteralType =
  | LiteralType<string>
  | LiteralType<number>
  | LiteralType<boolean>
  | LiteralType<null>;
