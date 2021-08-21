import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';
import { Factor } from '../../types/ast';

export const arrayExpression = ({ ast, execObject }: IInterpreterRules<Factor>) => {
  const literals = ast.children.arrayExpression[0].children.rules.map((value: any) => {
    return execObject.interpreter({ ast: value, execObject });
  });
  return {
    name: LiteralTokens.ArrayLiteral,
    image: literals,
  };
};
