import { IInterpreterRules } from './types';

export const pipeFrom = ({ ast, context }: IInterpreterRules<any>) => {
  if (ast.children.arguments) {
    const argumentsAst = ast.children.arguments[0];
    return context.interpreter({ ast: argumentsAst, context: context });
  } else {
    return context.interpreter({ ast: ast.children.LogicExpression[0], context: context });
  }
};
