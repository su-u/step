import { IInterpreterRules } from '../types';

export const arrayElement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const variableName = ast.children.ArrayElement[0].children.IdentifierSuffix[0].image.slice(0, -1);
  const index = getIndex({ ast, manager, execObject });
  return manager.variable.reference(variableName, index);
};

const getIndex = ({ ast, manager }: IInterpreterRules) => {
  if (ast.children.ArrayElement[0].children.index[0].children.NumberLiteral !== undefined) {
    return parseInt(ast.children.ArrayElement[0].children.index[0].children.NumberLiteral[0].image);
  } else if (ast.children.ArrayElement[0].children.index[0].children.Identifier !== undefined) {
    return manager.variable.reference(
      ast.children.ArrayElement[0].children.index[0].children.Identifier[0].image,
    ).image;
  }
};
