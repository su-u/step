import { IInterpreterRules } from './types';

export const functionStatement = ({ ast, manager }: IInterpreterRules) => {
  const functionName = ast.children.FunctionNameToken[0].image.slice(0, -1);
  const argAst = ast.children.arguments[0];
  const funcArguments =argAst.children.Identifier !== undefined ? argAst.children.Identifier.map((x: any) => {
    return x.image;
  }) : [];
  manager.function.assignment(functionName, funcArguments, ast.children.Program[0]);
  return;
};
