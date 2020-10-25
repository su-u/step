import { IInterpreterRules } from '../types';
import { LiteralTokens } from '../../tokens';

export const arrayElement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const variableName = ast.children.ArrayElement[0].children.IdentifierSuffix[0].image.slice(0, -1);
  console.log(variableName);
  return {
    name: LiteralTokens.DebugLiteral,
    image: null,
  };
};
