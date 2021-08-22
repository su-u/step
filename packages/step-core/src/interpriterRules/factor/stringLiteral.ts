import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';
import { Factor } from '../../types/ast';

export const stringLiteral = ({ ast }: IInterpreterRules<Factor>) => {
  const image = ast.children.StringLiteral[0].image.slice(1).slice(0, -1);
  return {
    name: LiteralTokens.StringLiteral,
    image,
  };
};
