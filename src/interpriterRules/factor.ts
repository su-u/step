import { IInterpreterRules } from './types';
import { variableManager } from '../manager';

export const factor = ({ ast }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    const image = parseInt(ast.children.NumberLiteral[0].image);
    return {
      name: 'NumberLiteral',
      image,
    };
  } else if (ast.children.Identifier !== undefined) {
    return variableManager.reference(ast.children.Identifier[0].image).image;
  }
};
