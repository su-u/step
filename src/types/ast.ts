declare type Program = {
  name: 'Program';
  children: {
    ProgramRule: ProgramRule[];
  };
};

declare type ProgramRule = {
  name: 'ProgramRule';
  children: {
    rule: Rule[];
  };
};

declare type Rule = {};

declare type Assignment = {
  name: 'Assignment';
  children: {
    ToRight: ToRight[];
  };
};

declare type ToRight = {
  name: 'ToRight';
  children: {
    from: LogicExpression[];
  };
};

declare type LogicExpression = {
  name: 'LogicalExpression';
  children: {
    RelationExpression: RelationExpression[];
  };
};

declare type RelationExpression = {
  name: 'RelationExpression';
  children: {
    Expression: Expression[];
  };
};

declare type Expression = {
  name: 'Expression';
  Term: Term[];
};

declare type Term = {};
