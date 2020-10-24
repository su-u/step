import { IInterpreterRules } from '../types';
import { VariableManager } from '../../manager';

export const callFunction = ({ ast, manager, execObject }: IInterpreterRules) => {
  const obj = ast.children.CallFunction[0];
  const name = obj.children.FunctionNameToken[0].image.slice(0, -1);
  const functionData = manager.function.reference(name);
  if (functionData.type === 'user') {
    const scopeManger = new VariableManager(manager.variable);
    functionData.arguments.forEach((x: any, i: number) => {
      scopeManger.assignment(
        x,
        execObject.interpreter({
          ast: obj.children.arguments[0].children.Factor[i],
          manager: {
            variable: scopeManger,
            function: manager.function,
          },
          execObject,
        }),
      );
    });
    return execObject.interpreter({
      ast: functionData.function,
      manager: {
        variable: scopeManger,
        function: manager.function,
      },
      execObject,
    });
  } else {
    const arg = functionData.arguments.map((_: any, i: number) => {
      return execObject.interpreter({
        ast: obj.children.arguments[0].children.Factor[i],
        manager,
        execObject,
      });
    });
    return functionData.function(arg);
  }
};
