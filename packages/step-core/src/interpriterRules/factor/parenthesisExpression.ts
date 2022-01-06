import { IInterpreterRules } from '../types';
import { Factor } from '../../types/ast';

export const parenthesisExpression = ({ ast, context }: IInterpreterRules<Factor>) => {
  return context.interpreter({
    ast: ast.children.parentheses[0].children.rules[0],
    context: context,
  });
};
