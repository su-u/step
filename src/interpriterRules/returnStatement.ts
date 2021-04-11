import { IInterpreterRules } from './types';

export const returnStatement = ({ ast, execObject }: IInterpreterRules<any>) => {
  const result = execObject.interpreter({ ast: ast.children.rules[0], execObject });
  execObject.manager.variable.returnValue = result;
  return result;
};
