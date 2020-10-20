import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const returnStatement = ({ ast, status }: IInterpreterRules) => {
  const result = interpreter(ast.children.return[0]);
  status.returnValue = result;
  return result;
};
