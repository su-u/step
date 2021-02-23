import { IInterpreterRules } from '../types';

export const objectLiteral = ({ ast, manager, execObject }: IInterpreterRules<Factor>) => {
  return execObject.interpreter({
    ast: ast.children.object[0].children.arguments[0],
    manager,
    execObject,
  });
};
