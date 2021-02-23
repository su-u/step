import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';

export const numberLiteral = ({ ast }: IInterpreterRules<Factor>) => {
  const image = Number(ast.children.NumberLiteral[0].image);
  return {
    name: LiteralTokens.NumberLiteral,
    image,
  };
};
