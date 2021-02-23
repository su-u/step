import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';

export const booleanLiteral = ({ ast }: IInterpreterRules<Factor>) => {
  const image = ast.children.BoolLiteral[0].image;
  return {
    name: LiteralTokens.BooleanLiteral,
    image,
  };
};
