import { ChiboParser, ChiboLexer } from './parser';

export const parseInput = (text: string) => {
  const parser = new ChiboParser();
  const lexResult = ChiboLexer.tokenize(text);
  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens;
  // any top level rule may be used as an entry point
  const ast = parser.ProgramRoot();

  if (parser.errors.length > 0) {
    console.error(parser.errors);
  }

  return ast;
};
