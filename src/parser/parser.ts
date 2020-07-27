import { Lexer, CstParser, createToken } from 'chevrotain';

// const createToken = chevrotain.createToken;
// const Lexer = chevrotain.Lexer;

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
  pattern: /[a-zA-z][0-9a-zA-Z]+/,
});

const LBracket = createToken({name: "LBrackets", pattern: /\(/, label: '('});
const RBracket = createToken({name: "RBrackets", pattern: /\)/, label: ')'});
const LCurly = createToken({name: "LCurly", pattern: /{/, label: '{'});
const RCurly = createToken({name: "RCurly", pattern: /}/, label: '}'});
const LSquare = createToken({name: "LSquare", pattern: /\[/, label: '['});
const RSquare = createToken({name: "RSquare", pattern: /]/, label: ']'});

const SubstitutionOperator = createToken( {name: "SubstitutionOperator", pattern: Lexer.NA});
const ToRight = createToken({name: "ToRight", pattern: /(?!<)->/, categories: SubstitutionOperator})
const ToLeft = createToken({name: "ToLeft", pattern: /<-(?!>)/, categories: SubstitutionOperator})

const AdditionOperator = createToken({name: "AdditionOperator", pattern: Lexer.NA});
const Plus = createToken({name: "Plus", pattern: /\+/, categories: AdditionOperator});
const Minus = createToken({name: "Minus", pattern: /(?!<)-(?!>)/, categories: AdditionOperator});

const MultiplicationOperator = createToken({name: "MultiplicationOperator", pattern: Lexer.NA});
const Multi = createToken({name: "Multi", pattern: /\*/, categories: MultiplicationOperator});
const Div = createToken({name: "Div", pattern: /\//, categories: MultiplicationOperator});

const Pipe = createToken({name: "Pipe", pattern: /(?!-)>>/})

const RelationalOperator = createToken({name: "RelationalOperator", pattern: Lexer.NA});
const AmountMore = createToken({name: "AmountMore", pattern: /<=/, categories: RelationalOperator});
const AmountLess = createToken({name: "AmountLess", pattern: />=/, categories: RelationalOperator});
const OverThan = createToken({name: "OverTha", pattern: /</, categories: RelationalOperator});
const LessThan = createToken({name: "LessThan", pattern: />/, categories: RelationalOperator});
const Equal = createToken({name: "Equal", pattern: /=/, categories: RelationalOperator});


const allTokens = [WhiteSpace, NumberLiteral, StringLiteral, Plus, Minus, Multi, Div, ToRight, ToLeft, Identifier];

export const JsonLexer = new Lexer(allTokens);

// const CstParser = chevrotain.CstParser;

export class ChiboParser extends CstParser {
  constructor() {
    super(allTokens);

    this.performSelfAnalysis();
  }

    public Program = this.RULE('Program', () => {
      this.MANY(() => {
        this.SUBRULE(this.Substitution);
      });
    });

    private Literal =  this.RULE('Literal', () => {
      this.OR([
        { ALT: () => this.CONSUME(StringLiteral) },
        { ALT: () => this.CONSUME(NumberLiteral) },
      ]);
    });

    private Expr = this.RULE('Expr', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.Substitution) },
        { ALT: () => this.SUBRULE(this.Pipe) },
      ]);
    });

    private Factor = this.RULE('Factor', () => {
      this.OR([
        { ALT: () => {
          this.CONSUME(LBracket);
          this.SUBRULE(this.RelationExpression);
          this.CONSUME(RBracket);
        } },
        { ALT: () => this.CONSUME(StringLiteral) },
        { ALT: () => this.CONSUME(NumberLiteral) },
        { ALT: () => this.CONSUME(Identifier) },
      ]);
    });

    private Expression = this.RULE('Expression', () => {
      this.MANY(() => {
        this.OR([
          {ALT: () => this.SUBRULE(this.Term)},
          {ALT: () => this.SUBRULE2(this.BinaryExpression)},
        ]);
      });
    });

    private Term = this.RULE('Term', () => {
      this.SUBRULE(this.Literal)
      this.CONSUME(MultiplicationOperator);
      this.SUBRULE2(this.Literal)
    });

    private BinaryExpression = this.RULE('BinaryExpression', () => {
      this.SUBRULE(this.Literal);
      this.CONSUME(AdditionOperator);
      this.SUBRULE2(this.Literal);
    });

    private Substitution = this.RULE('Substitution', () => {
      this.OR([
        { ALT: () =>       {
            this.SUBRULE1(this.To, {LABEL: "right"});
            this.CONSUME(ToLeft);
            this.SUBRULE2(this.From, {LABEL: "left"});
          }},
        { ALT: () =>       {
            this.SUBRULE3(this.From, {LABEL: "left"});
            this.CONSUME(ToRight);
            this.SUBRULE4(this.To, {LABEL: "right"});
          }},
      ]);
    });

    private To = this.RULE('To', () => {
      this.CONSUME(Identifier);
    });

    private Pipe = this.RULE('Pipe', () => {
      this.SUBRULE(this.From);
      this.CONSUME(Pipe);
      this.SUBRULE2(this.From);
    });

    private From = this.RULE('From', () => {
      this.OR([
        { ALT: () => this.CONSUME(BoolLiteral) },
        { ALT: () => this.CONSUME(Identifier) },
        { ALT: () => this.CONSUME(StringLiteral) },
        { ALT: () => this.CONSUME(NumberLiteral) },
      ]);
    });

    private RelationExpression = this.RULE('RelationExpression', () =>{
      this.MANY(() => {
        this.SUBRULE(this.Expression);
        this.OR([
          {ALT: () => this.CONSUME(AmountMore)},
          {ALT: () => this.CONSUME(AmountLess)},
          {ALT: () => this.CONSUME(OverThan)},
          {ALT: () => this.CONSUME(LessThan)},
          {ALT: () => this.CONSUME(Equal)},
        ]);
        this.SUBRULE2(this.Expression);
      });
    });
}
