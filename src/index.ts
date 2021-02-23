import { parseInput } from './parser';
import { interpreter } from './interpreter';
import { VariableManager, FunctionManager, Manager } from './manager';
import { writeAstToJson } from './util/file';
import { removeObjectByKey, UnnecessaryKeys } from './util/json';

export const entry = (text: string) => {
  const ast = parseInput(text) as ProgramRoot;

  try {
    const manager: Manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
    interpreter<ProgramRoot, any>({ ast, manager, execObject: { interpreter } });
    manager.variable.debug();
    manager.function.debug();
    // const rAst = removeObjectByKey(ast, UnnecessaryKeys);
    // writeAstToJson(rAst as any);
  } catch (err) {
    console.error(err);
  }
};
