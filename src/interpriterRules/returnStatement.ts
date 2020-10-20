import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const returnStatement = ({ ast, scope }: IInterpreterRules) => {
  const result = interpreter(ast.children.return[0], scope);
  scope.returnValue = result;
  return result;
};
