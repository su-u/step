import { IInterpreterRules } from './types';
import { FunctionStatement } from '../types/ast';

export const functionStatement = ({ ast, context }: IInterpreterRules<FunctionStatement>) => {
  const functionName = ast.children.FunctionNameToken[0].image.slice(0, -1);
  const argAst = ast.children.arguments[0];
  const funcArguments =
    argAst.children.Identifier !== undefined
      ? argAst.children.Identifier.map((x: any) => {
          return x.image;
        })
      : [];
  context.manager.function.assignment(functionName, funcArguments, ast.children.rules[0]);
  return;
};
