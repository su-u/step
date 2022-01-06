import { IInterpreterRules } from './types';
import { ReturnStatement } from '../types/ast';

export const returnStatement = ({ ast, context }: IInterpreterRules<ReturnStatement>) => {
  const result = context.interpreter({ ast: ast.children.rules[0], context });
  context.manager.variable.returnValue = result;
  return result;
};
