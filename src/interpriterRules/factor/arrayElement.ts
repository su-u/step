import { IInterpreterRules } from '../types';

export const arrayElement = ({ ast, manager }: IInterpreterRules) => {
  const variableName = ast.children.ArrayElement[0].children.IdentifierSuffix[0].image.slice(0, -1);
  const index = parseInt(ast.children.ArrayElement[0].children.index[0].children.NumberLiteral[0].image)
  return manager.variable.reference(variableName, index);
};
