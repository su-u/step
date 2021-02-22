import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';

export const arrayStatement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const literals = ast.children.arrayExpression[0].children.rules.map((value: any) => {
    return execObject.interpreter({ ast: value, manager, execObject });
  });
  return {
    name: LiteralTokens.ArrayLiteral,
    image: literals,
  };
};
