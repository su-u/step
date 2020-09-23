declare type Operator = '+' | '-' | '*' | '/' | '<' | '>' | '<=' | '>=';

declare type ObjectType = 'Variable' | 'Function' | 'Block' | 'Literal';

declare type ClassType = 'Object' | 'Number' | 'String' | 'Boolean' | 'Console';

declare type AstType = {
  readonly type: 'Program';
  body: BodyType[];
};

declare type ClassBaseObjectType = {
  readonly superClass: any;
  readonly className: ClassType;
};

declare type BinaryObjectType = 'Literal' | 'Identifier';

declare type BodyType = {
  readonly type: 'ExpressionStatement';
  readonly expression: ExpressionType;
};

declare type ExpressionType = {
  readonly type: 'AssignmentExpression';
  readonly operator: Operator;
  readonly left: BinaryExpressionType | IdentifierType;
  readonly right: BinaryExpressionType | AllLiteralType | IdentifierType;
};

declare type BinaryExpressionType = {
  readonly type: 'BinaryExpression';
  readonly operator: Operator;
  readonly left: BinaryExpressionType | AllLiteralType | IdentifierType;
  readonly right: BinaryExpressionType | AllLiteralType | IdentifierType;
};

declare type IdentifierType = {
  readonly type: 'Identifier';
  readonly name: string;
};

declare type ExecObjectType = AllLiteralType | IdentifierType;

declare type ParamsType<T> = ReadonlyArray<T>;
