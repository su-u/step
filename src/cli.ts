import { parseInput } from './parser';
import * as fs from 'fs-extra';
import { interpreter } from './interpreter';
import { VariableManager, functionManager, Manager } from './manager';
import logger from './logger';
import { writeAstToJson } from './util/file';
logger.level = 'debug';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
// AST確認用

try {
  const manager: Manager = {
    variable: new VariableManager(null),
    function: null,
  };
  interpreter({ ast, manager, execObject: { interpreter } });
  manager.variable.debug();
  functionManager.debug();
  writeAstToJson(ast as any);
} catch (err) {
  console.error(err);
}
