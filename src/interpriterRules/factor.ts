import { IInterpreterRules } from './types';

export const factor = ({ ast }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    return parseInt(ast.children.NumberLiteral[0].image);
  }
};
