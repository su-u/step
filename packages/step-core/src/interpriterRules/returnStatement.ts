import { IInterpreterRules } from './types';
import { ReturnStatement } from '../types/ast';

export const returnStatement = ({ ast, execObject }: IInterpreterRules<ReturnStatement>) => {
  const result = execObject.interpreter({ ast: ast.children.rules[0], execObject });
  execObject.manager.variable.returnValue = result;
  return result;
};
