import { BoolLiteral, Identifier, LiteralType, NumberLiteral, StepObject, StringLiteral } from './literal';

export type ProgramRoot = {
  name: 'ProgramRoot';
  children: {
    rules: ProgramRules[];
  };
};

export type ProgramRules = {
  name: 'ProgramRules';
  children: {
    rules: (Assignment | FunctionStatement | IfStatement)[];
  };
};

export type BlockStatement = {
  name: 'BlockStatement';
  children: {
    rules: BlockRules[];
  };
};

export type BlockRules = {
  name: 'BlockRules';
  children: {
    rules: (Assignment | FunctionStatement)[];
  };
};

export type IfStatement = {
  name: 'IfStatement';
  children: {
    conditionalExpression: LogicExpression[];
    rules: BlockStatement[];
  };
};

export type FunctionStatement = {
  name: 'FunctionStatement';
  children: {
    FunctionNameToken: {
      image: string;
    }[];
    arguments: FunctionArguments[];
    rules: ProgramRoot[];
  };
};

export type FunctionArguments = {
  name: 'FunctionArguments';
  children: {
    Identifier: Identifier[];
  };
};

export type Assignment = {
  name: 'Assignment';
  children: {
    rules: ToRight[];
  };
};

export type ToRight = {
  name: 'ToRight';
  children: {
    head: LogicExpression[];
    tail: {
      image: string;
    };
  };
};

export type LogicExpression = {
  name: 'LogicalExpression';
  children: {
    rules: RelationExpression[];
  };
};

export type RelationExpression = {
  name: 'RelationExpression';
  children: {
    rules: Expression[];
  };
};

export type Expression = {
  name: 'Expression';
  children: {
    rules: Term[];
  };
};

export type Term = {
  name: 'Term';
  children: {
    rules: PipeExpression[];
  };
};

export type PipeExpression = {
  name: 'PipeExpression';
  children: {
    head: RangeExpression[];
  };
};

export type RangeExpression = {
  name: 'RangeExpression';
  children: {
    rules: Factor[];
  };
};

export type DotsIdentifier = {
  children: {
    identifier: LiteralType[];
  }
}

export type Factor = {
  name: 'Factor';
  children: {
    DotsIdentifier: DotsIdentifier;
    NumberLiteral?: NumberLiteral[];
    StringLiteral?: StringLiteral[];
    BoolLiteral?: BoolLiteral[];
    Identifier?: Identifier[];
    object?: StepObject[];
    parentheses?: any[];
  };
};
