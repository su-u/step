import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const relationExpression = ({ ast }: IInterpreterRules) => {
  return interpreter(ast.children.Expression[0]);
};
