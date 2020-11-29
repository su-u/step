import { IInterpreterRules } from '../interpriterRules/types';

export const getIndex = ({ ast, manager }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    return parseInt(ast.children.NumberLiteral[0].image);
  } else if (ast.children.Identifier !== undefined) {
    return manager.variable.reference(ast.children.Identifier[0].image).image;
  }
};
