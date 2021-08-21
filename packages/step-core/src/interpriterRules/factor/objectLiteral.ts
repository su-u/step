import { IInterpreterRules } from '../types';
import { Factor } from '../../types/ast';

export const objectLiteral = ({ ast, execObject }: IInterpreterRules<Factor>) => {
  return execObject.interpreter({
    ast: ast.children.object[0].children.arguments[0],
    execObject,
  });
};
