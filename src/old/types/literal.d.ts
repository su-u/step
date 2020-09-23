declare type BaseLiteralType = {
  readonly type: 'Literal' | 'Variable';
};

type NumberLiteralType = {
  readonly class: 'Number';
} & BaseLiteralType;

type BooleanLiteralType = {
  readonly class: 'Boolean';
} & BaseLiteralType;

type StringLiteralType = {
  readonly class: 'String';
} & BaseLiteralType;

type NullLiteralType = {
  readonly class: 'Null';
} & BaseLiteralType;

declare type LiteralType<T> = {
  readonly value: T;
} & (NumberLiteralType | BooleanLiteralType | StringLiteralType | NullLiteralType);

declare type AllLiteralType =
  | LiteralType<string>
  | LiteralType<number>
  | LiteralType<boolean>
  | LiteralType<null>;
