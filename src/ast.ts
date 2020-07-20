import * as fs from 'fs-extra';
import pegjs from 'pegjs';

export const readAst = (rulesetPath: string, sourcePath: string): AstType => {
  const ruleset = fs.readFileSync(rulesetPath, 'utf-8');

  const source = fs.readFileSync(sourcePath, 'utf-8');
  const parser = pegjs.generate(ruleset);
  return parser.parse(source);
};
