import { IInterpreterRules } from '../types';

export const objectLiteral = ({ ast, manager, execObject }: IInterpreterRules) => {
  return execObject.interpreter({
    ast: ast.children.Object[0].children.arguments[0],
    manager,
    execObject,
  });
};
