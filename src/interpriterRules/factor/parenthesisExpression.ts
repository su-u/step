import { IInterpreterRules } from '../types';
import { Factor } from '../../types/ast';

export const parenthesisExpression = ({ ast, manager, execObject }: IInterpreterRules<Factor>) => {
  return execObject.interpreter({
    ast: ast.children.parentheses[0].children.rules[0],
    manager,
    execObject,
  });
};
