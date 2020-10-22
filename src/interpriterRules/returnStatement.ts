import { IInterpreterRules } from './types';

export const returnStatement = ({ ast, scope, interpreter }: IInterpreterRules) => {
  const result = interpreter(ast.children.return[0], scope, interpreter);
  scope.returnValue = result;
  return result;
};
