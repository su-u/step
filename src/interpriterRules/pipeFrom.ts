import { IInterpreterRules } from './types';

export const pipeFrom = ({ ast, execObject }: IInterpreterRules<any>) => {
  if (ast.children.arguments !== undefined) {
    const argumentsAst = ast.children.arguments[0];
    return execObject.interpreter({ ast: argumentsAst, execObject });
  } else {
    return execObject.interpreter({ ast: ast.children.LogicExpression[0], execObject });
  }
};
