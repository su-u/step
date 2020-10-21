import { IInterpreterRules } from './types';
import { functionManager } from '../manager';

export const functionStatement = ({ ast }: IInterpreterRules) => {
  const functionName = ast.children.FunctionNameToken[0].image;
  const funcArguments = ast.children.arguments[0].children.Identifier.map((x: any) => {
    return x.image;
  });
  functionManager.assignment(functionName, funcArguments, ast.children.Program[0]);
  return;
};
