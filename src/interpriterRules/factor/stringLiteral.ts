import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';

export const stringLiteral = ({ ast }: IInterpreterRules) => {
  const image = ast.children.StringLiteral[0].image.slice(1).slice(0, -1);
  return {
    name: LiteralTokens.StringLiteral,
    image,
  };
};
