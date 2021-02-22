import { Lexer, CstParser, createToken } from 'chevrotain';

const Comment = createToken({
  name: 'Comment',
  pattern: /#.*[\r\n]/,
});
const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(:?[^\\"\n\r]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
});
const NumberLiteral = createToken({
  name: 'NumberLiteral',
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
});
const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});
const Separate = createToken({
  name: 'Separate',
  pattern: /;/,
  group: Lexer.SKIPPED,
});
const BoolLiteral = createToken({
  name: 'BoolLiteral',
  pattern: /true|false/,
});
const IdentifierSuffix = createToken({
  name: 'IdentifierSuffix',
  pattern: /[a-zA-z][0-9a-zA-Z]+\[/,
});
const Identifier = createToken({
  name: 'Identifier',
  pattern: /[a-zA-z][0-9a-zA-Z]*/,
});

const LiteralTokens = [
  Comment,
  Separate,
  StringLiteral,
  NumberLiteral,
  WhiteSpace,
  BoolLiteral,
  IdentifierSuffix,
  Identifier,
];

const LBracket = createToken({ name: 'LBrackets', pattern: /\(/, label: '(' });
const RBracket = createToken({ name: 'RBrackets', pattern: /\)/, label: ')' });
const LCurly = createToken({ name: 'LCurly', pattern: /{/, label: '{' });
const RCurly = createToken({ name: 'RCurly', pattern: /}/, label: '}' });
const LSquare = createToken({ name: 'LSquare', pattern: /\[/, label: '[' });
const RSquare = createToken({ name: 'RSquare', pattern: /]/, label: ']' });
const Comma = createToken({ name: 'Comma', pattern: /,/ });
const Colon = createToken({ name: 'Colon', pattern: /:/ });

const BracketTokens = [LBracket, RBracket, LCurly, RCurly, LSquare, RSquare, Comma, Colon];

const AdditionOperator = createToken({ name: 'AdditionOperator', pattern: Lexer.NA });
const Plus = createToken({ name: 'Plus', pattern: /\+/, categories: AdditionOperator });
const Minus = createToken({
  name: 'Minus',
  pattern: /(?!<)-(?!>)/,
  categories: AdditionOperator,
});

const MultiplicationOperator = createToken({ name: 'MultiplicationOperator', pattern: Lexer.NA });
const Multi = createToken({ name: 'Multi', pattern: /\*/, categories: MultiplicationOperator });
const Div = createToken({ name: 'Div', pattern: /\//, categories: MultiplicationOperator });
const Mod = createToken({ name: 'Mod', pattern: /%/, categories: MultiplicationOperator });

const OperatorTokens = [AdditionOperator, Plus, Minus, MultiplicationOperator, Multi, Div, Mod];

const RelationalOperator = createToken({ name: 'RelationalOperator', pattern: Lexer.NA });
const AmountMore = createToken({
  name: 'AmountMore',
  pattern: /<=/,
  categories: RelationalOperator,
});
const AmountLess = createToken({
  name: 'AmountLess',
  pattern: />=/,
  categories: RelationalOperator,
});
const OverThan = createToken({
  name: 'OverThan',
  pattern: /<(?!-)/,
  categories: RelationalOperator,
});
const LessThan = createToken({
  name: 'LessThan',
  pattern: /(?![-=])>/,
  categories: RelationalOperator,
});
const Equal = createToken({
  name: 'Equal',
  pattern: /(?!<>)=(?!>)/,
  categories: RelationalOperator,
});

const RelationalOperatorTokens = [
  RelationalOperator,
  AmountMore,
  AmountLess,
  OverThan,
  LessThan,
  Equal,
];

const LogicalJoinOperator = createToken({ name: 'LogicalJoinOperator', pattern: Lexer.NA });
const AndOperator = createToken({
  name: 'AndOperator',
  pattern: /and/,
  categories: LogicalJoinOperator,
});

const OrOperator = createToken({
  name: 'OrOperator',
  pattern: /or/,
  categories: LogicalJoinOperator,
});

const LogicalOperatorTokens = [AndOperator, OrOperator];

const functionToken = createToken({ name: 'FunctionToken', pattern: /function/ });
const eachToken = createToken({ name: 'EachToken', pattern: /each/ });
const matchToken = createToken({ name: 'MatchToken', pattern: /match/ });
const ifToken = createToken({ name: 'IfToken', pattern: /if/ });
const elseToken = createToken({ name: 'ElseToken', pattern: /else/ });
const tildeToken = createToken({ name: 'TildeToken', pattern: /~/ });
const PipeToken = createToken({ name: 'PipeToken', pattern: /(?!-)\|>/ });
const ArrowToken = createToken({ name: 'Arrow', pattern: /(?!><)=>/ });
const ToRightToken = createToken({
  name: 'ToRightToken',
  pattern: /(?!<)->/,
});
const ToLeftToken = createToken({
  name: 'ToLeftToken',
  pattern: /<-(?!>)/,
});
const ReturnToken = createToken({
  name: 'ReturnToken',
  pattern: /return/,
});
const BreakToken = createToken({
  name: 'BreakToken',
  pattern: /break/,
});
const functionNameToken = createToken({
  name: 'FunctionNameToken',
  pattern: /[a-zA-z][0-9a-zA-Z]*\(/,
});

const BuildInTokens = [
  functionToken,
  eachToken,
  matchToken,
  ifToken,
  elseToken,
  tildeToken,
  PipeToken,
  ArrowToken,
  ToRightToken,
  ToLeftToken,
  ReturnToken,
  BreakToken,
  functionNameToken,
];

const allTokens = [
  ...BuildInTokens,
  ...BracketTokens,
  ...LogicalOperatorTokens,
  ...RelationalOperatorTokens,
  ...LiteralTokens,
  ...OperatorTokens,
];
export const ChiboLexer = new Lexer(allTokens);

// const CstParser = chevrotain.CstParser;

export class ChiboParser extends CstParser {
  constructor() {
    super(allTokens);

    this.performSelfAnalysis();
  }

  public Program = this.RULE('Program', () => {
    this.MANY(() => {
      this.SUBRULE(this.ProgramRule, { LABEL: 'rules' });
    });
  });

  private ProgramRule = this.RULE('ProgramRule', () => {
    this.OR([
      { ALT: () => this.CONSUME(Comment, { LABEL: 'rules' }) },
      { ALT: () => this.SUBRULE(this.Function, { LABEL: 'rules' }) },
      { ALT: () => this.SUBRULE(this.IfStatement, { LABEL: 'rules' }) },
      { ALT: () => this.SUBRULE(this.Assignment, { LABEL: 'rules' }) },
      { ALT: () => this.SUBRULE(this.ReturnStatement, { LABEL: 'rules' }) },
    ]);
  });

  private Assignment = this.RULE('Assignment', () => {
    this.SUBRULE(this.ToRight, { LABEL: 'rules' });
  });

  private Each = this.RULE('Each', () => {
    this.CONSUME(eachToken);
    this.OPTION(() => {
      this.CONSUME(LBracket);
      this.CONSUME(Identifier);
      this.CONSUME(RBracket);
    });
    this.CONSUME(LCurly);
    this.SUBRULE(this.Program, { LABEL: 'rules' });
    this.CONSUME(RCurly);
  });

  private IfStatement = this.RULE('IfStatement', () => {
    this.CONSUME(ifToken);
    this.CONSUME(LBracket);
    this.SUBRULE(this.LogicExpression, { LABEL: 'conditionalExpression' });
    this.CONSUME(RBracket);
    this.CONSUME(LCurly);
    this.SUBRULE(this.BlockStatement);
    this.CONSUME(RCurly);
    this.OPTION(() => {
      this.CONSUME(elseToken);
      this.CONSUME2(LCurly);
      this.SUBRULE2(this.BlockStatement);
      this.CONSUME2(RCurly);
    });
  });

  private Function = this.RULE('Function', () => {
    this.CONSUME(functionToken);
    this.CONSUME(functionNameToken);
    this.SUBRULE(this.FunctionArguments, { LABEL: 'arguments' });
    this.CONSUME(RBracket);
    this.CONSUME(LCurly);
    this.SUBRULE(this.Program, { LABEL: 'rules' });
    this.CONSUME(RCurly);
  });

  private FunctionArguments = this.RULE('FunctionArguments', () => {
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.CONSUME(Identifier);
      },
    });
  });

  private BlockStatement = this.RULE('BlockStatement', () => {
    this.MANY(() => {
      this.SUBRULE(this.BlockRule, { LABEL: 'rules' });
    });
  });

  private BlockRule = this.RULE('BlockRule', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Function, { LABEL: 'rules' }) },
      { ALT: () => this.SUBRULE(this.IfStatement, { LABEL: 'rules' }) },
      { ALT: () => this.SUBRULE(this.Assignment, { LABEL: 'rules' }) },
      { ALT: () => this.CONSUME(BreakToken, { LABEL: 'rules' }) },
    ]);
  });

  private Match = this.RULE('Match', () => {
    this.CONSUME(matchToken);
    this.CONSUME(LCurly);
    this.MANY_SEP2({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.MatchExpression, { LABEL: 'rules' });
      },
    });
    this.CONSUME(RCurly);
  });

  private MatchExpression = this.RULE('MatchExpression', () => {
    this.CONSUME(LBracket);
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.LogicExpression, { LABEL: 'arguments' });
      },
    });
    this.CONSUME(RBracket);
    this.CONSUME(ArrowToken);
    this.CONSUME(LCurly);
    this.SUBRULE(this.Program, { LABEL: 'rules' });
    this.CONSUME(RCurly);
  });

  private ToRight = this.RULE('ToRight', () => {
    this.SUBRULE(this.LogicExpression, { LABEL: 'from' });
    this.OPTION(() => {
      this.CONSUME(ToRightToken);
      this.OR([
        { ALT: () => this.SUBRULE(this.ArrayElement, { LABEL: 'to' }) },
        { ALT: () => this.CONSUME(Identifier, { LABEL: 'to' }) },
      ]);
    });
  });

  private PipeExpression = this.RULE('PipeExpression', () => {
    this.SUBRULE(this.RangeExpression, { LABEL: 'from' });
    this.MANY(() => {
      this.CONSUME(PipeToken);
      this.SUBRULE2(this.RangeExpression, { LABEL: 'tail' });
    });
  });

  private Object = this.RULE('Object', () => {
    this.CONSUME(LCurly);
    this.SUBRULE(this.PipeArguments, { LABEL: 'arguments' });
    this.CONSUME(RCurly);
  });

  private PipeArguments = this.RULE('PipeArguments', () => {
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.PipeArgument, { LABEL: 'argument' });
      },
    });
  });

  private PipeArgument = this.RULE('PipeArgument', () => {
    this.OPTION(() => {
      this.CONSUME(Identifier, { LABEL: 'name' });
      this.CONSUME(Colon);
    });
    this.SUBRULE(this.LogicExpression, { LABEL: 'rules' });
  });

  private LogicExpression = this.RULE('LogicExpression', () => {
    this.SUBRULE(this.RelationExpression, { LABEL: 'rules' });
    this.MANY(() => {
      this.CONSUME(LogicalJoinOperator);
      this.SUBRULE2(this.RelationExpression, { LABEL: 'rules' });
    });
  });

  private RelationExpression = this.RULE('RelationExpression', () => {
    this.SUBRULE(this.Expression, { LABEL: 'rules' });
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(AmountMore) },
        { ALT: () => this.CONSUME(AmountLess) },
        { ALT: () => this.CONSUME(OverThan) },
        { ALT: () => this.CONSUME(LessThan) },
        { ALT: () => this.CONSUME(Equal) },
      ]);
      this.SUBRULE2(this.Expression, { LABEL: 'rules' });
    });
  });

  private Expression = this.RULE('Expression', () => {
    this.SUBRULE(this.Term, { LABEL: 'rules' });
    this.MANY(() => {
      this.CONSUME(AdditionOperator);
      this.SUBRULE2(this.Term, { LABEL: 'rules' });
    });
  });

  private Term = this.RULE('Term', () => {
    this.SUBRULE(this.PipeExpression, { LABEL: 'rules' });
    this.MANY(() => {
      this.CONSUME(MultiplicationOperator);
      this.SUBRULE2(this.PipeExpression, { LABEL: 'rules' });
    });
  });

  private RangeExpression = this.RULE('RangeExpression', () => {
    this.SUBRULE(this.Factor, { LABEL: 'rules' });
    this.MANY(() => {
      this.CONSUME(tildeToken);
      this.SUBRULE2(this.Factor, { LABEL: 'rules' });
    });
  });

  private Factor = this.RULE('Factor', () => {
    this.OR([
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.CONSUME(BoolLiteral) },
      { ALT: () => this.SUBRULE(this.ParenthesisExpression) },
      { ALT: () => this.SUBRULE(this.ArrayElement) },
      { ALT: () => this.CONSUME(Identifier) },
      { ALT: () => this.SUBRULE(this.ArrayStatement) },
      { ALT: () => this.SUBRULE(this.Object) },
      { ALT: () => this.SUBRULE(this.Match, { LABEL: 'toMatch' }) },
      { ALT: () => this.SUBRULE(this.Each, { LABEL: 'toEach' }) },
    ]);
  });

  private ArrayElement = this.RULE('ArrayElement', () => {
    this.CONSUME(IdentifierSuffix);
    this.SUBRULE(this.ArrayIndex, { LABEL: 'index' });
    this.CONSUME(RSquare);
  });

  private ArrayIndex = this.RULE('ArrayIndex', () => {
    this.OR([
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.SUBRULE(this.ArrayElement) },
      { ALT: () => this.CONSUME(Identifier) },
    ]);
  });

  private ArrayStatement = this.RULE('ArrayStatement', () => {
    this.CONSUME(LSquare);
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.Factor);
      },
    });
    this.CONSUME(RSquare);
  });

  private ParenthesisExpression = this.RULE('ParenthesisExpression', () => {
    this.CONSUME(LBracket);
    this.SUBRULE(this.LogicExpression, { LABEL: 'expression' });
    this.CONSUME(RBracket);
  });

  private ReturnStatement = this.RULE('ReturnStatement', () => {
    this.CONSUME(ReturnToken);
    this.SUBRULE(this.LogicExpression, { LABEL: 'return' });
  });
}
