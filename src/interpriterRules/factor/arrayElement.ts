import { IInterpreterRules } from '../types';
import { getIndex } from '../../util/ast';

export const arrayElement = ({ ast, manager, execObject }: IInterpreterRules<any>) => {
  const variableName = ast.children.arrayElement[0].children.IdentifierSuffix[0].image.slice(0, -1);
  const index = getIndex({
    ast: ast.children.arrayElement[0].children.rules[0],
    manager,
    execObject,
  });
  return manager.variable.reference(variableName, index);
};
