import { IInterpreterRules } from '../types';
import { VariableManager } from '../../manager';

export const execFunction = ({ ast, execObject }: IInterpreterRules<any>, last) => {
  // 関数実行
  const { manager } = execObject;
  const functionName = ast.DotsIdentifier[0].children.identifier[0].image;
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
      execObject: {
        manager: {
          variable: scopeManger,
          function: manager.function,
        },
        interpreter: execObject.interpreter,
      },
    });
  } else {
    const arg = functionData.arguments
      .filter((_, j) => j < literals.length)
      .map((_: any, i: number) => {
        const image = literals[i].value !== undefined ? literals[i].value : literals[i];
        return image;
      })
      .filter((x: any) => x !== undefined);
    last = functionData.function(arg);
  }
  return last;
};
