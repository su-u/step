(function jsonGrammarOnlyExample() {
  // ----------------- Lexer -----------------
  const createToken = chevrotain.createToken;
  const Lexer = chevrotain.Lexer;

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
  const Identifier = createToken({
    name: 'Identifier',
    pattern: /[a-zA-z][0-9a-zA-Z]*/,
  });

  const LiteralTokens = [
    Separate,
    StringLiteral,
    NumberLiteral,
    WhiteSpace,
    BoolLiteral,
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

  const BracketTokens = [LBracket, RBracket, LCurly, RCurly, LSquare, RSquare, Comma];

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

  const OperatorTokens = [AdditionOperator, Plus, Minus, MultiplicationOperator, Multi, Div];

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
    name: 'OverTha',
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

  const functionToken = createToken({ name: 'FunctionToken', pattern: /function/ });
  const eachToken = createToken({ name: 'EachToken', pattern: /each/ });
  const ifToken = createToken({ name: 'IfToken', pattern: /if/ });
  const elseToken = createToken({ name: 'ElseToken', pattern: /else/ });
  const tildeToken = createToken({ name: 'TildeToken', pattern: /~/ });
  const PipeToken = createToken({ name: 'PipeToken', pattern: /(?!-)\|>/ });
  const ArrowToken = createToken({ name: 'Arrow', pattern: /(?!>)=>/ });
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
    pattern: /[a-zA-z][0-9a-zA-Z]*\:/,
  });

  const BuildInTokens = [
    functionToken,
    eachToken,
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
    ...LiteralTokens,
    ...BracketTokens,
    ...OperatorTokens,
    ...RelationalOperatorTokens,
  ];
  const ChiboLexer = new Lexer(allTokens);

  // ----------------- parser -----------------
  const CstParser = chevrotain.CstParser;

  class ChiboParser extends CstParser {
    constructor() {
      super(allTokens);

      this.Program = this.RULE('Program', () => {
        this.MANY(() => {
          this.OR([
            { ALT: () => this.SUBRULE(this.Function) },
            { ALT: () => this.SUBRULE(this.IfStatement) },
            { ALT: () => this.SUBRULE(this.Assignment) },
            { ALT: () => this.SUBRULE(this.ReturnStatement) },
          ]);
        });
      });

      this.Assignment = this.RULE('Assignment', () => {
        this.OR([
          { ALT: () => this.SUBRULE(this.ToLeft) },
          { ALT: () => this.SUBRULE(this.ToRight) },
        ]);
      });

      this.Each = this.RULE('Each', () => {
        this.CONSUME(eachToken);
        this.OPTION(() => {
          this.CONSUME(LBracket);
          this.CONSUME(Identifier);
          this.CONSUME(RBracket);
        });
        this.CONSUME(LCurly);
        this.SUBRULE(this.Program);
        this.CONSUME(RCurly);
      });

      this.IfStatement = this.RULE('IfStatement', () => {
        this.CONSUME(ifToken);
        this.CONSUME(LBracket);
        this.SUBRULE(this.RelationExpression, { LABEL: 'conditionalExpression' });
        this.CONSUME(RBracket);
        this.CONSUME(LCurly);
        this.SUBRULE(this.BrockStatement);
        this.CONSUME(RCurly);
        this.OPTION(() => {
          this.CONSUME(elseToken);
          this.CONSUME2(LCurly);
          this.SUBRULE2(this.BrockStatement);
          this.CONSUME2(RCurly);
        });
      });

      this.Function = this.RULE('Function', () => {
        this.CONSUME(functionToken);
        this.CONSUME(functionNameToken);
        this.SUBRULE(this.FunctionArgments, { LABEL: 'arguments' });
        this.CONSUME(LCurly);
        this.SUBRULE(this.Program);
        this.CONSUME(RCurly);
      });

      this.FunctionArgments = this.RULE('FunctionArgments', () => {
        this.MANY_SEP({
          SEP: Comma,
          DEF: () => {
            this.CONSUME(Identifier);
          },
        });
      });

      this.BrockStatement = this.RULE('BlockStatement', () => {
        this.MANY(() => {
          this.OR([
            { ALT: () => this.SUBRULE(this.Function, { LABEL: 'statement' }) },
            { ALT: () => this.SUBRULE(this.IfStatement, { LABEL: 'statement' }) },
            { ALT: () => this.SUBRULE(this.Assignment, { LABEL: 'statement' }) },
            { ALT: () => this.CONSUME(BreakToken, { LABEL: 'statement' }) },
          ]);
        });
      });

      this.ToRight = this.RULE('ToRight', () => {
        this.SUBRULE(this.Pipe, { LABEL: 'from' });
        this.MANY(() => {
          this.CONSUME(ToRightToken);
          this.CONSUME(Identifier, { LABEL: 'to' });
        });
      });

      this.ToLeft = this.RULE('ToLeft', () => {
        this.CONSUME(Identifier, { LABEL: 'to' });
        this.CONSUME(ToLeftToken);
        this.SUBRULE(this.Pipe, { LABEL: 'from' });
      });

      this.Pipe = this.RULE('Pipe', () => {
        this.SUBRULE(this.PipeFrom, { LABEL: 'from' });
        this.MANY(() => {
          this.CONSUME(PipeToken);
          this.OR([
            { ALT: () => this.SUBRULE(this.Each, { LABEL: 'toEach' }) },
            { ALT: () => this.CONSUME(Identifier, { LABEL: 'toIdentifier' }) },
          ]);
        });
      });

      this.PipeFrom = this.RULE('PipeFrom', () => {
        this.OR([
          {
            ALT: () => {
              this.CONSUME(LCurly);
              this.SUBRULE(this.PipeArguments, { LABEL: 'arguments' });
              this.CONSUME(RCurly);
            },
          },
          { ALT: () => this.SUBRULE(this.RelationExpression) },
        ]);
      });

      this.PipeArguments = this.RULE('PipeArguments', () => {
        this.MANY_SEP({
          SEP: Comma,
          DEF: () => {
            this.SUBRULE(this.Factor);
          },
        });
      });

      this.RelationExpression = this.RULE('RelationExpression', () => {
        this.SUBRULE(this.Expression);
        this.MANY(() => {
          this.OR([
            { ALT: () => this.CONSUME(AmountMore) },
            { ALT: () => this.CONSUME(AmountLess) },
            { ALT: () => this.CONSUME(OverThan) },
            { ALT: () => this.CONSUME(LessThan) },
            { ALT: () => this.CONSUME(Equal) },
            { ALT: () => this.CONSUME(tildeToken) },
          ]);
          this.SUBRULE2(this.Expression);
        });
      });

      this.Expression = this.RULE('Expression', () => {
        this.SUBRULE(this.Term);
        this.MANY(() => {
          this.CONSUME(AdditionOperator);
          this.SUBRULE2(this.Term);
        });
      });

      this.Term = this.RULE('Term', () => {
        this.SUBRULE(this.Factor);
        this.MANY(() => {
          this.CONSUME(MultiplicationOperator);
          this.SUBRULE2(this.Factor);
        });
      });

      this.Factor = this.RULE('Factor', () => {
        this.OR([
          { ALT: () => this.CONSUME(NumberLiteral) },
          { ALT: () => this.CONSUME(StringLiteral) },
          { ALT: () => this.CONSUME(BoolLiteral) },
          { ALT: () => this.SUBRULE(this.ParenthesisExpression) },
          { ALT: () => this.CONSUME(Identifier) },
        ]);
      });

      this.ParenthesisExpression = this.RULE('ParenthesisExpression', () => {
        this.CONSUME(LBracket);
        this.SUBRULE(this.RelationExpression, { LABEL: 'expression' });
        this.CONSUME(RBracket);
      });

      this.ReturnStatement = this.RULE('ReturnStatement', () => {
        this.CONSUME(ReturnToken);
        this.SUBRULE(this.RelationExpression, { LABEL: 'return' });
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
