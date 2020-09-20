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

  const Tokens = [StringLiteral, NumberLiteral, WhiteSpace, BoolLiteral, Identifier];

  const LBracket = createToken({ name: 'LBrackets', pattern: /\(/, label: '(' });
  const RBracket = createToken({ name: 'RBrackets', pattern: /\)/, label: ')' });
  const LCurly = createToken({ name: 'LCurly', pattern: /{/, label: '{' });
  const RCurly = createToken({ name: 'RCurly', pattern: /}/, label: '}' });
  const LSquare = createToken({ name: 'LSquare', pattern: /\[/, label: '[' });
  const RSquare = createToken({ name: 'RSquare', pattern: /]/, label: ']' });

  const BracketTokens = [LBracket, RBracket, LCurly, RCurly, LSquare, RSquare];

  // const SubstitutionOperator = createToken({ name: 'SubstitutionOperator', pattern: Lexer.NA });
  const ToRight = createToken({
    name: 'ToRight',
    pattern: /(?!<)->/,
  });
  const ToLeft = createToken({
    name: 'ToLeft',
    pattern: /<-(?!>)/,
  });

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

  const OperatorTokens = [
    ToRight,
    ToLeft,
    AdditionOperator,
    Plus,
    Minus,
    MultiplicationOperator,
    Multi,
    Div,
  ];

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
  const PipeToken = createToken({ name: 'PipeToken', pattern: /(?!-)\|>/ });
  const Arrow = createToken({ name: 'Arrow', pattern: /(?!>)=>/ });

  const RelationalOperatorTokens = [
    RelationalOperator,
    AmountMore,
    AmountLess,
    OverThan,
    LessThan,
    Equal,
    Arrow,
    PipeToken,
  ];

  const allTokens = [...Tokens, ...BracketTokens, ...OperatorTokens, ...RelationalOperatorTokens];
  const ChiboLexer = new Lexer(allTokens);

  // ----------------- parser -----------------
  const CstParser = chevrotain.CstParser;

  class ChiboParser extends CstParser {
    constructor() {
      super(allTokens);

      this.Program = this.RULE('Program', () => {
        this.MANY(() => {
          this.OR([
            {
              ALT: () => {
                this.SUBRULE(this.Main2);
              },
            },
            {
              ALT: () => {
                this.SUBRULE2(this.Main);
              },
            },
          ]);
        });
      });

      this.Main = this.RULE('Main', () => {
        this.SUBRULE(this.Pipe, { LABEL: 'left' });
        this.MANY(() => {
          this.CONSUME(ToRight);
          this.SUBRULE(this.To, { LABEL: 'right' });
        });
      });

      this.Main2 = this.RULE('Main2', () => {
        this.SUBRULE(this.To, { LABEL: 'right' });
        this.CONSUME(ToLeft);
        this.SUBRULE(this.RelationExpression, { LABEL: 'left' });
      });

      this.Pipe = this.RULE('Pipe', () => {
        this.SUBRULE(this.RelationExpression);
        this.MANY(() => {
          this.CONSUME(PipeToken);
          this.CONSUME(Identifier);
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

      this.parenthesisExpression = this.RULE('parenthesisExpression', () => {
        this.CONSUME(LBracket);
        this.SUBRULE(this.RelationExpression);
        this.CONSUME(RBracket);
        this.OPTION(() => {
          this.SUBRULE(this.Function);
        });
      });

      this.Factor = this.RULE('Factor', () => {
        this.OR([
          { ALT: () => this.CONSUME(Identifier) },
          { ALT: () => this.CONSUME(NumberLiteral) },
          { ALT: () => this.SUBRULE(this.parenthesisExpression) },
          { ALT: () => this.CONSUME(StringLiteral) },
        ]);
      });

      this.Function = this.RULE('Function', () => {
        this.CONSUME(Arrow);
        this.SUBRULE(this.FunctionImplementation);
      });

      this.FunctionImplementation = this.RULE('FunctionImplementation', () => {
        this.CONSUME(LCurly);
        this.SUBRULE(this.Program);
        this.CONSUME(RCurly);
      });

      this.To = this.RULE('To', () => {
        this.CONSUME(Identifier);
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
          ]);
          this.SUBRULE2(this.Expression);
        });
      });

      this.performSelfAnalysis();
    }
  }

  // for the playground to work the returned object must contain these fields
  return {
    lexer: ChiboLexer,
    parser: ChiboParser,
    defaultRule: 'Program',
  };
})();
