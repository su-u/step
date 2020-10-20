import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const each = ({ ast, scope }: IInterpreterRules) => {
  const result = interpreter(ast.children.Program[0], scope);
  return result;
};
