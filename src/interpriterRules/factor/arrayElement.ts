import { IInterpreterRules } from '../types';
import { getIndex } from '../../util/ast';
import { Factor } from '../../types/ast';

export const arrayElement = ({ ast, execObject }: IInterpreterRules<Factor>) => {
  const variableName = ast.children.arrayElement[0].children.IdentifierSuffix[0].image.slice(0, -1);
  const index = getIndex({
    ast: ast.children.arrayElement[0].children.rules[0],
    execObject,
  });
  return execObject.manager.variable.reference(variableName, index);
};
