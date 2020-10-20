import { IInterpreterRules } from './types';
import { functionManager, StatusManager, variableManager } from '../manager';
import { interpreter } from '../interpreter';

export const factor = ({ ast }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    const image = parseInt(ast.children.NumberLiteral[0].image);
    return {
      name: 'NumberLiteral',
      image,
    };
  } else if (ast.children.Identifier !== undefined) {
    return variableManager.reference(ast.children.Identifier[0].image);
  } else if (ast.children.CallFunction !== undefined) {
    const obj = ast.children.CallFunction[0];
    const name = obj.children.FunctionNameToken[0].image;
    const functionData = functionManager.reference(name);
    functionData.arguments.forEach((x: any, i: number) => {
      variableManager.assignment(x, interpreter(obj.children.arguments[0].children.Factor[i]));
    });
    const statusManger = new StatusManager();
    return interpreter(functionData.program, statusManger);
  }
};
