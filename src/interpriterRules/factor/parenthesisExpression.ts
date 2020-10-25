import { IInterpreterRules } from '../types';

export const parenthesisExpression = ({ ast, manager, execObject }: IInterpreterRules) => {
  return execObject.interpreter({
    ast: ast.children.ParenthesisExpression[0].children.expression[0],
    manager,
    execObject,
  });
};
