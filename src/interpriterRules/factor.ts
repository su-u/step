import { IInterpreterRules } from './types';
import { functionManager, ScopeManager } from '../manager';
import { interpreter } from '../interpreter';

export const factor = ({ ast, scope }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    const image = parseInt(ast.children.NumberLiteral[0].image);
    return {
      name: 'NumberLiteral',
      image,
    };
  } else if (ast.children.Identifier !== undefined) {
    return scope.reference(ast.children.Identifier[0].image);
  } else if (ast.children.CallFunction !== undefined) {
    const obj = ast.children.CallFunction[0];
    const name = obj.children.FunctionNameToken[0].image;
    const functionData = functionManager.reference(name);
    const scopeManger = new ScopeManager(scope);
    functionData.arguments.forEach((x: any, i: number) => {
      scopeManger.assignment(x, interpreter(obj.children.arguments[0].children.Factor[i]));
    });
    return interpreter(functionData.program, scopeManger);
  }
};
