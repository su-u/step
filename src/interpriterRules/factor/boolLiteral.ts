import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';
import { Factor } from '../../types/ast';

export const booleanLiteral = ({ ast }: IInterpreterRules<Factor>) => {
  const image = ast.children.BoolLiteral[0].image;
  return {
    name: LiteralTokens.BooleanLiteral,
    image,
  };
};
