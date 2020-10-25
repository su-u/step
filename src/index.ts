import { parseInput } from './parser';
import { interpreter } from './interpreter';
import { VariableManager, FunctionManager, Manager } from './manager';
import logger from './logger';
import { writeAstToJson } from './util/file';
import { removeObjectByKey, UnnecessaryKeys } from './util/json';
// logger.level = 'debug';
logger.level = 'fatal';

export const entry = (text: string) => {
  const ast = parseInput(text);
  // AST確認用

  try {
    const manager: Manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
    interpreter({ ast, manager, execObject: { interpreter } });
    manager.variable.debug();
    manager.function.debug();
    const rAst = removeObjectByKey(ast, UnnecessaryKeys);
    writeAstToJson(rAst as any);
  } catch (err) {
    console.error(err);
  }
};
