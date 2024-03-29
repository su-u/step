import { IInterpreterRules } from '../types';
import { getIndex } from '../../util/ast';
import { Factor } from '../../types/ast';

export const arrayElement = ({ ast, context }: IInterpreterRules<Factor>) => {
  const variableName = ast.children.arrayElement[0].children.IdentifierSuffix[0].image.slice(0, -1);
  const index = getIndex({
    ast: ast.children.arrayElement[0].children.rules[0],
    context: context,
  });
  return context.manager.variable.reference(variableName, index);
};
