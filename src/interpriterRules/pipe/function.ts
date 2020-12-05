import { IInterpreterRules } from '../types';
import { VariableManager } from '../../manager';

export const execFunction = ({ ast, manager, execObject }: IInterpreterRules, last) => {
  // 関数実行
  const functionName = ast.children.toIdentifier[0].image;
  const functionData = manager.function.reference(functionName);
  const literals = Array.isArray(last) ? last : [last];
  if (functionData.type === 'user') {
    const scopeManger = new VariableManager(manager.variable);
    functionData.arguments.forEach((argName: any, i: number) => {
      let argValue: null;
      if (literals.find((literal) => literal.name === argName)) {
        argValue = literals.find((literal) => literal.name === argName).value;
      } else {
        argValue = literals[i].value !== undefined ? literals[i].value : literals[i];
      }

      scopeManger.assignment(argName, argValue);
    });
    last = execObject.interpreter({
      ast: functionData.function,
      manager: {
        variable: scopeManger,
        function: manager.function,
      },
      execObject,
    });
  } else {
    const arg = functionData.arguments
      .map((_: any, i: number) => {
        const image = literals[i].value !== undefined ? literals[i].value : literals[i];
        return image;
      })
      .filter((x: any) => x !== undefined);
    last = functionData.function(arg);
  }
  return last;
};
