import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const relationExpression = ({ ast, scope }: IInterpreterRules) => {
  return interpreter(ast.children.Expression[0], scope);
};
