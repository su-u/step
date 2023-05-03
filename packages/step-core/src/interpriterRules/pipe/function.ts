import { IInterpreterRules } from '../types';
import { VariableManager } from '../../manager';

export const execFunction = ({ ast, context }: IInterpreterRules<any>, last) => {
  // 関数実行
  const { manager } = context;
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

      scopeManger.scopeAssignment(argName, argValue);
    });
    last = context.interpreter({
      ast: functionData.function,
      context: {
        manager: {
          variable: scopeManger,
          function: manager.function,
        },
        interpreter: context.interpreter,
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
