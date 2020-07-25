import { ChiboParser, JsonLexer } from './parser';
import * as fs from 'fs-extra';
import { writeAstToJson } from '../util/file';

// ONLY ONCE
const parser = new ChiboParser();

function parseInput(text) {
  const lexResult = JsonLexer.tokenize(text);
  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens;
  // any top level rule may be used as an entry point
  const ast = parser.Program();

  if (parser.errors.length > 0) {
    throw new Error('sad sad panda, Parsing errors detected');
  }

  return ast;
}

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
console.log(JSON.stringify(ast, undefined, 2));
writeAstToJson(ast as any);
