import { IInterpreterRules } from '../interpriterRules/types';

export const getIndex = ({ ast, execObject: { manager }}: IInterpreterRules<any>) => {
  if (ast.children.NumberLiteral) {
    return parseInt(ast.children.NumberLiteral[0].image);
  } else if (ast.children.Identifier) {
    return manager.variable.reference(ast.children.Identifier[0].image).image;
  }
};
