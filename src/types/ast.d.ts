declare type ProgramRoot = {
  name: 'ProgramRoot';
  children: {
    rules: ProgramRules[];
  };
};

declare type ProgramRules = {
  name: 'ProgramRules';
  children: {
    rules: (Assignment | FunctionStatement | IfStatement)[];
  };
};

declare type BlockStatement = {
  name: 'BlockStatement';
  children: {
    rules: BlockRules[];
  };
};

declare type BlockRules = {
  name: 'BlockRules';
  children: {
    rules: (Assignment | FunctionStatement)[];
  };
};

declare type IfStatement = {
  name: 'IfStatement';
  children: {
    conditionalExpression: LogicExpression[];
    rules: BlockStatement[];
  };
};

declare type FunctionStatement = {
  name: 'FunctionStatement';
  children: {
    FunctionNameToken: {
      image: string;
    }[];
    arguments: FunctionArguments[];
    rules: ProgramRoot[];
  };
};

declare type FunctionArguments = {
  name: 'FunctionArguments';
  children: {
    Identifier: Identifier[];
  };
};

declare type Assignment = {
  name: 'Assignment';
  children: {
    rules: ToRight[];
  };
};

declare type ToRight = {
  name: 'ToRight';
  children: {
    head: LogicExpression[];
    tail: {
      image: string;
    };
  };
};

declare type LogicExpression = {
  name: 'LogicalExpression';
  children: {
    rules: RelationExpression[];
  };
};

declare type RelationExpression = {
  name: 'RelationExpression';
  children: {
    rules: Expression[];
  };
};

declare type Expression = {
  name: 'Expression';
  children: {
    rules: Term[];
  };
};

declare type Term = {
  name: 'Term';
  children: {
    rules: PipeExpression[];
  };
};

declare type PipeExpression = {
  name: 'PipeExpression';
  children: {
    head: RangeExpression[];
  };
};

declare type RangeExpression = {
  name: 'RangeExpression';
  children: {
    rules: Factor[];
  };
};

declare type Factor = {
  name: 'Factor';
  children: {
    NumberLiteral?: NumberLiteral[];
    StringLiteral?: StringLiteral[];
    BoolLiteral?: BoolLiteral[];
    Identifier?: Identifier[];
    object?: StepObject[];
    parentheses?: any[];
  };
};
