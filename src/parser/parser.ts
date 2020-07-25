import { Lexer, CstParser, createToken } from 'chevrotain';

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
const CalculationOperator = createToken({ name: 'RelationalOperator', pattern: Lexer.NA });
const Plus = createToken({ name: 'Plus', pattern: /\+/, categories: CalculationOperator });
const Minus = createToken({ name: 'Minus', pattern: /-/, categories: CalculationOperator });
const Multi = createToken({ name: 'Multi', pattern: /\*/, categories: CalculationOperator });
const Div = createToken({ name: 'Div', pattern: /\//, categories: CalculationOperator });

const allTokens = [WhiteSpace, NumberLiteral, StringLiteral];

const jsonTokens = [WhiteSpace, NumberLiteral, StringLiteral];

export const JsonLexer = new Lexer(allTokens);

export class ChiboParser extends CstParser {
  constructor() {
    super(jsonTokens);
    this.performSelfAnalysis();
  }

  public Program = this.RULE('Program', () => {
    this.SUBRULE(this.value);
  });

  private value = this.RULE('value', () => {
    this.OR([
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.CONSUME(NumberLiteral) },
    ]);
  });
}
