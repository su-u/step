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
