(function jsonGrammarOnlyExample() {
  // ----------------- Lexer -----------------
  const createToken = chevrotain.createToken;
  const Lexer = chevrotain.Lexer;

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

  const AdditionOperators = createToken({ name: 'AdditionOperator', pattern: Lexer.NA });
  const Plus = createToken({ name: 'Plus', pattern: /\+/, categories: AdditionOperators });
  const Minus = createToken({
    name: 'Minus',
    pattern: /(?!<)-(?!>)/,
    categories: AdditionOperators,
  });

  const MultiplicationOperators = createToken({ name: 'MultiplicationOperator', pattern: Lexer.NA });
  const Multi = createToken({ name: 'Multi', pattern: /\*/, categories: MultiplicationOperators });
  const Div = createToken({ name: 'Div', pattern: /\//, categories: MultiplicationOperators });
  const Mod = createToken({ name: 'Mod', pattern: /%/, categories: MultiplicationOperators });

  const OperatorTokens = [AdditionOperators, Plus, Minus, MultiplicationOperators, Multi, Div, Mod];

  const RelationalOperators = createToken({ name: 'RelationalOperator', pattern: Lexer.NA });
  const AmountMore = createToken({
    name: 'AmountMore',
    pattern: /<=/,
    categories: RelationalOperators,
  });
  const AmountLess = createToken({
    name: 'AmountLess',
    pattern: />=/,
    categories: RelationalOperators,
  });
  const OverThan = createToken({
    name: 'OverThan',
    pattern: /<(?!-)/,
    categories: RelationalOperators,
  });
  const LessThan = createToken({
    name: 'LessThan',
    pattern: /(?![-=])>/,
    categories: RelationalOperators,
  });
  const Equal = createToken({
    name: 'Equal',
    pattern: /(?!<>)=(?!>)/,
    categories: RelationalOperators,
  });

  const RelationalOperatorTokens = [
    RelationalOperators,
    AmountMore,
    AmountLess,
    OverThan,
    LessThan,
    Equal,
  ];

  const LogicalJoinOperators = createToken({ name: 'LogicalJoinOperator', pattern: Lexer.NA });
  const AndOperator = createToken({
    name: 'AndOperator',
    pattern: /and/,
    categories: LogicalJoinOperators,
  });

  const OrOperator = createToken({
    name: 'OrOperator',
    pattern: /or/,
    categories: LogicalJoinOperators,
  });

  const LogicalOperatorTokens = [AndOperator, OrOperator];

  const FunctionToken = createToken({ name: 'FunctionToken', pattern: /function/ });
  const EachToken = createToken({ name: 'EachToken', pattern: /each/ });
  const MatchToken = createToken({ name: 'MatchToken', pattern: /match/ });
  const IfToken = createToken({ name: 'IfToken', pattern: /if/ });
  const ElseToken = createToken({ name: 'ElseToken', pattern: /else/ });
  const TildeToken = createToken({ name: 'TildeToken', pattern: /~/ });
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
  const FunctionNameToken = createToken({
    name: 'FunctionNameToken',
    pattern: /[a-zA-z][0-9a-zA-Z]*\(/,
  });

  const BuildInTokens = [
    FunctionToken,
    EachToken,
    MatchToken,
    IfToken,
    ElseToken,
    TildeToken,
    PipeToken,
    ArrowToken,
    ToRightToken,
    ToLeftToken,
    ReturnToken,
    BreakToken,
    FunctionNameToken,
  ];

  const allTokens = [
    ...BuildInTokens,
    ...BracketTokens,
    ...LogicalOperatorTokens,
    ...RelationalOperatorTokens,
    ...LiteralTokens,
    ...OperatorTokens,
  ];
  const ChiboLexer = new Lexer(allTokens);

  // ----------------- parser -----------------
  const CstParser = chevrotain.CstParser;

  class ChiboParser extends CstParser {
    constructor() {
      super(allTokens);

      this.Program = this.RULE('Program', () => {
        this.MANY(() => {
          this.SUBRULE(this.ProgramRules, { LABEL: 'rules' });
        });
      });

      this.ProgramRules = this.RULE('ProgramRule', () => {
        this.OR([
          { ALT: () => this.CONSUME(Comment, { LABEL: 'rules' }) },
          { ALT: () => this.SUBRULE(this.FunctionStatement, { LABEL: 'rules' }) },
          { ALT: () => this.SUBRULE(this.IfStatement, { LABEL: 'rules' }) },
          { ALT: () => this.SUBRULE(this.Assignment, { LABEL: 'rules' }) },
          { ALT: () => this.SUBRULE(this.ReturnStatement, { LABEL: 'rules' }) },
        ]);
      });

      this.Assignment = this.RULE('Assignment', () => {
        this.SUBRULE(this.ToRight, { LABEL: 'rules' });
      });

      this.Each = this.RULE('Each', () => {
        this.CONSUME(EachToken);
        this.OPTION(() => {
          this.CONSUME(LBracket);
          this.CONSUME(Identifier);
          this.CONSUME(RBracket);
        });
        this.CONSUME(LCurly);
        this.SUBRULE(this.Program, { LABEL: 'rules' });
        this.CONSUME(RCurly);
      });

      this.IfStatement = this.RULE('IfStatement', () => {
        this.CONSUME(IfToken);
        this.CONSUME(LBracket);
        this.SUBRULE(this.LogicExpression, { LABEL: 'conditionalExpression' });
        this.CONSUME(RBracket);
        this.CONSUME(LCurly);
        this.SUBRULE(this.BlockStatement, { LABEL: 'rules' });
        this.CONSUME(RCurly);
        this.OPTION(() => {
          this.CONSUME(ElseToken);
          this.CONSUME2(LCurly);
          this.SUBRULE2(this.BlockStatement, { LABEL: 'rules' });
          this.CONSUME2(RCurly);
        });
      });

      this.FunctionStatement = this.RULE('FunctionStatement', () => {
        this.CONSUME(FunctionToken);
        this.CONSUME(FunctionNameToken);
        this.SUBRULE(this.FunctionArguments, { LABEL: 'arguments' });
        this.CONSUME(RBracket);
        this.CONSUME(LCurly);
        this.SUBRULE(this.Program, { LABEL: 'rules' });
        this.CONSUME(RCurly);
      });

      this.FunctionArguments = this.RULE('FunctionArguments', () => {
        this.MANY_SEP({
          SEP: Comma,
          DEF: () => {
            this.CONSUME(Identifier);
          },
        });
      });

      this.BlockStatement = this.RULE('BlockStatement', () => {
        this.MANY(() => {
          this.SUBRULE(this.BlockRules, { LABEL: 'rules' });
        });
      });

      this.BlockRules = this.RULE('BlockRules', () => {
        this.OR([
          { ALT: () => this.SUBRULE(this.FunctionStatement, { LABEL: 'rules' }) },
          { ALT: () => this.SUBRULE(this.IfStatement, { LABEL: 'rules' }) },
          { ALT: () => this.SUBRULE(this.Assignment, { LABEL: 'rules' }) },
          { ALT: () => this.CONSUME(BreakToken, { LABEL: 'rules' }) },
        ]);
      });

      this.Match = this.RULE('Match', () => {
        this.CONSUME(MatchToken);
        this.CONSUME(LCurly);
        this.MANY_SEP2({
          SEP: Comma,
          DEF: () => {
            this.SUBRULE(this.MatchExpression, { LABEL: 'rules' });
          },
        });
        this.CONSUME(RCurly);
      });

      this.MatchExpression = this.RULE('MatchExpression', () => {
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

      this.ToRight = this.RULE('ToRight', () => {
        this.SUBRULE(this.LogicExpression, { LABEL: 'head' });
        this.OPTION(() => {
          this.CONSUME(ToRightToken);
          this.OR([
            { ALT: () => this.SUBRULE(this.ArrayElement, { LABEL: 'tail' }) },
            { ALT: () => this.CONSUME(Identifier, { LABEL: 'tail' }) },
          ]);
        });
      });

      this.PipeExpression = this.RULE('PipeExpression', () => {
        this.SUBRULE(this.RangeExpression, { LABEL: 'head' });
        this.MANY(() => {
          this.CONSUME(PipeToken);
          this.SUBRULE2(this.RangeExpression, { LABEL: 'tail' });
        });
      });

      this.Object = this.RULE('Object', () => {
        this.CONSUME(LCurly);
        this.SUBRULE(this.PipeArguments, { LABEL: 'arguments' });
        this.CONSUME(RCurly);
      });

      this.PipeArguments = this.RULE('PipeArguments', () => {
        this.MANY_SEP({
          SEP: Comma,
          DEF: () => {
            this.SUBRULE(this.PipeArgument, { LABEL: 'argument' });
          },
        });
      });

      this.PipeArgument = this.RULE('PipeArgument', () => {
        this.OPTION(() => {
          this.CONSUME(Identifier, { LABEL: 'name' });
          this.CONSUME(Colon);
        });
        this.SUBRULE(this.LogicExpression, { LABEL: 'rules' });
      });

      this.LogicExpression = this.RULE('LogicExpression', () => {
        this.SUBRULE(this.RelationExpression, { LABEL: 'rules' });
        this.MANY(() => {
          this.CONSUME(LogicalJoinOperators);
          this.SUBRULE2(this.RelationExpression, { LABEL: 'rules' });
        });
      });

      this.RelationExpression = this.RULE('RelationExpression', () => {
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

      this.Expression = this.RULE('Expression', () => {
        this.SUBRULE(this.Term, { LABEL: 'rules' });
        this.MANY(() => {
          this.CONSUME(AdditionOperators);
          this.SUBRULE2(this.Term, { LABEL: 'rules' });
        });
      });

      this.Term = this.RULE('Term', () => {
        this.SUBRULE(this.PipeExpression, { LABEL: 'rules' });
        this.MANY(() => {
          this.CONSUME(MultiplicationOperators);
          this.SUBRULE2(this.PipeExpression, { LABEL: 'rules' });
        });
      });

      this.RangeExpression = this.RULE('RangeExpression', () => {
        this.SUBRULE(this.Factor, { LABEL: 'rules' });
        this.MANY(() => {
          this.CONSUME(TildeToken);
          this.SUBRULE2(this.Factor, { LABEL: 'rules' });
        });
      });

      this.Factor = this.RULE('Factor', () => {
        this.OR([
          { ALT: () => this.CONSUME(NumberLiteral) },
          { ALT: () => this.CONSUME(StringLiteral) },
          { ALT: () => this.CONSUME(BoolLiteral) },
          { ALT: () => this.SUBRULE(this.ParenthesisExpression, { LABEL: 'parentheses' }) },
          { ALT: () => this.SUBRULE(this.ArrayElement, { LABEL: 'arrayElement' }) },
          { ALT: () => this.CONSUME(Identifier) },
          { ALT: () => this.SUBRULE(this.ArrayExpression, { LABEL: 'arrayExpression' }) },
          { ALT: () => this.SUBRULE(this.Object, { LABEL: 'object' }) },
          { ALT: () => this.SUBRULE(this.Match, { LABEL: 'toMatch' }) },
          { ALT: () => this.SUBRULE(this.Each, { LABEL: 'toEach' }) },
        ]);
      });

      this.ArrayElement = this.RULE('ArrayElement', () => {
        this.CONSUME(IdentifierSuffix);
        this.SUBRULE(this.ArrayIndex, { LABEL: 'rules' });
        this.CONSUME(RSquare);
      });

      this.ArrayIndex = this.RULE('ArrayIndex', () => {
        this.OR([
          { ALT: () => this.CONSUME(NumberLiteral) },
          { ALT: () => this.SUBRULE(this.ArrayElement, { LABEL: 'rules' }) },
          { ALT: () => this.CONSUME(Identifier) },
        ]);
      });

      this.ArrayExpression = this.RULE('ArrayStatement', () => {
        this.CONSUME(LSquare);
        this.MANY_SEP({
          SEP: Comma,
          DEF: () => {
            this.SUBRULE(this.Factor, { LABEL: 'rules' });
          },
        });
        this.CONSUME(RSquare);
      });

      this.ParenthesisExpression = this.RULE('ParenthesisExpression', () => {
        this.CONSUME(LBracket);
        this.SUBRULE(this.LogicExpression, { LABEL: 'rules' });
        this.CONSUME(RBracket);
      });

      this.ReturnStatement = this.RULE('ReturnStatement', () => {
        this.CONSUME(ReturnToken);
        this.SUBRULE(this.LogicExpression, { LABEL: 'rules' });
      });

      this.performSelfAnalysis();
    }
  }

  return {
    lexer: ChiboLexer,
    parser: ChiboParser,
    defaultRule: 'Program',
  };
})();
