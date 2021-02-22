import { IInterpreterRules } from '../types';

export const parenthesisExpression = ({ ast, manager, execObject }: IInterpreterRules) => {
  return execObject.interpreter({
    ast: ast.children.parentheses[0].children.rules[0],
    manager,
    execObject,
  });
};
