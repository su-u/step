import { IInterpreterRules } from './types';

export const returnStatement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const result = execObject.interpreter({ ast: ast.children.return[0], manager, execObject });
  manager.variable.returnValue = result;
  // console.log('rt', result);
  return result;
};
