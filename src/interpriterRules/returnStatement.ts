import { IInterpreterRules } from './types';

export const returnStatement = ({ ast, manager, execObject }: IInterpreterRules<any>) => {
  const result = execObject.interpreter({ ast: ast.children.rules[0], manager, execObject });
  manager.variable.returnValue = result;
  return result;
};
