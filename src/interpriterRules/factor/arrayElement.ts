import { IInterpreterRules } from '../types';
import { getIndex } from '../../util/ast';

export const arrayElement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const variableName = ast.children.ArrayElement[0].children.IdentifierSuffix[0].image.slice(0, -1);
  const index = getIndex({
    ast: ast.children.ArrayElement[0].children.index[0],
    manager,
    execObject,
  });
  return manager.variable.reference(variableName, index);
};
