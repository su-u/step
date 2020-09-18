import { ChiboParser, ChiboLexer } from './parser';

// ONLY ONCE

export const parseInput = (text: string) => {
  const parser = new ChiboParser();
  const lexResult = ChiboLexer.tokenize(text);
  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens;
  // any top level rule may be used as an entry point
  const ast = parser.Program();

  if (parser.errors.length > 0) {
    console.log(parser.errors);
    throw new Error('sad sad panda, Parsing errors detected');
  }

  return ast;
};
