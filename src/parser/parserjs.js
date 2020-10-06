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
  const BoolLiteral = createToken({
    name: 'BoolLiteral',
    pattern: /true|false/,
  });
  const Identifier = createToken({
    name: 'Identifier',
    pattern: /[a-zA-z][0-9a-zA-Z]*/,
  });

  const LiteralTokens = [StringLiteral, NumberLiteral, WhiteSpace, BoolLiteral, Identifier];

  const LBracket = createToken({ name: 'LBrackets', pattern: /\(/, label: '(' });
  const RBracket = createToken({ name: 'RBrackets', pattern: /\)/, label: ')' });
  const LCurly = createToken({ name: 'LCurly', pattern: /{/, label: '{' });
  const RCurly = createToken({ name: 'RCurly', pattern: /}/, label: '}' });
  const LSquare = createToken({ name: 'LSquare', pattern: /\[/, label: '[' });
  const RSquare = createToken({ name: 'RSquare', pattern: /]/, label: ']' });
  const Comma = createToken({ name: 'Comma', pattern: /,/ });

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
    pattern: /(?!-|)>/,
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

  const eachToken = createToken({ name: 'EachToken', pattern: /each/ });
  const ifToken = createToken({ name: 'IfToken', pattern: /if/ });
  const functionToken = createToken({ name: 'FunctionToken', pattern: /function/ });
  const functionNameToken = createToken({
    name: 'FunctionNameToken',
    pattern: /[a-zA-z][0-9a-zA-Z]*\(/,
  });
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

  const BuildInTokens = [
    functionToken,
    functionNameToken,
    eachToken,
    tildeToken,
    ifToken,
    ArrowToken,
    PipeToken,
    ToRightToken,
    ToLeftToken,
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
            { ALT: () => this.SUBRULE(this.Assignment) },
          ]);
        });
      });

      this.Assignment = this.RULE('Assignment', () => {
        this.MANY(() => {
          this.OR([
            { ALT: () => this.SUBRULE(this.ToLeft) },
            { ALT: () => this.SUBRULE(this.ToRight) },
          ]);
        });
      });

      this.ToRight = this.RULE('ToRight', () => {
        this.SUBRULE(this.Pipe, { LABEL: 'left' });
        this.MANY(() => {
          this.CONSUME(ToRightToken);
          this.CONSUME(Identifier, { LABEL: 'right' });
        });
      });

      this.ToLeft = this.RULE('ToLeft', () => {
        this.CONSUME(Identifier, { LABEL: 'right' });
        this.CONSUME(ToLeftToken);
        this.SUBRULE(this.Pipe, { LABEL: 'left' });
      });

      this.Function = this.RULE('Function', () => {
        this.CONSUME(functionToken);
        this.CONSUME(functionNameToken);
        this.MANY_SEP({
          SEP: Comma,
          DEF: () => {
            this.CONSUME(Identifier);
          },
        });
        this.CONSUME(RBracket);
        this.CONSUME(LCurly);
        this.SUBRULE(this.Program);
        this.CONSUME(RCurly);
      });

      this.Pipe = this.RULE('Pipe', () => {
        this.SUBRULE(this.RelationExpression);
        this.MANY(() => {
          this.CONSUME(PipeToken);
          this.OPTION(() => this.CONSUME(Identifier));
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
          { ALT: () => this.CONSUME(Identifier) },
          { ALT: () => this.CONSUME(NumberLiteral) },
          { ALT: () => this.CONSUME(StringLiteral) },
          { ALT: () => this.SUBRULE(this.parenthesisExpression) },
        ]);
      });

      this.parenthesisExpression = this.RULE('parenthesisExpression', () => {
        this.CONSUME(LBracket);
        this.SUBRULE(this.RelationExpression);
        this.CONSUME(RBracket);
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
