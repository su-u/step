import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';
import { functionManager } from '../manager';

export const functionStatement = ({ ast }: IInterpreterRules) => {
  const functionName = ast.children.FunctionNameToken[0].image;
  const funcArguments = Object.values(ast.children.arguments[0].children).map((x: any) => {
    return x[0].image;
  });
  console.log('a', funcArguments);
  functionManager.assignment(functionName, funcArguments, ast.children.Program[0]);
};
