import { IInterpreterRules } from './types';

export const functionStatement = ({ ast, manager }: IInterpreterRules) => {
  const functionName = ast.children.FunctionNameToken[0].image;
  const funcArguments = ast.children.arguments[0].children.Identifier.map((x: any) => {
    return x.image;
  });
  manager.function.assignment(functionName, funcArguments, ast.children.Program[0]);
  return;
};
