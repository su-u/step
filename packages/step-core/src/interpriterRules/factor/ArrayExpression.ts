import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';
import { Factor } from '../../types/ast';

export const arrayExpression = ({ ast, context }: IInterpreterRules<Factor>) => {
  const literals = ast.children.arrayExpression[0].children.rules.map((value: any) => {
    return context.interpreter({ ast: value, context: context });
  });
  return {
    name: LiteralTokens.ArrayLiteral,
    image: literals,
  };
};
