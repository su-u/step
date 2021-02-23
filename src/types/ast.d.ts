declare type ProgramRoot = {
  name: 'ProgramRoot';
  children: {
    rules: ProgramRules[];
  };
};

declare type ProgramRules = {
  name: 'ProgramRules';
  children: {
    rules: {
      Assignment;
    }[];
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
  children: {
    NumberLiteral: NumberLiteral[];
  };
};
