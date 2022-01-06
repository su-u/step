import { IInterpreterRules } from '../types';
import { Factor } from '../../types/ast';

export const objectLiteral = ({ ast, context }: IInterpreterRules<Factor>) => {
  return context.interpreter({
    ast: ast.children.object[0].children.arguments[0],
    context: context,
  });
};
