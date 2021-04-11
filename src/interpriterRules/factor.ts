import { IInterpreterRules } from './types';
import { LiteralTokens } from '../tokens';
import { dotsIdentifier } from './factor/dotsIdentifier';
import { booleanLiteral } from './factor/boolLiteral';
import { numberLiteral } from './factor/numberLiteral';
import { stringLiteral } from './factor/stringLiteral';
import { parenthesisExpression } from './factor/parenthesisExpression';
import { arrayExpression } from './factor/ArrayExpression';
import { arrayElement } from './factor/arrayElement';
import { objectLiteral } from './factor/objectLiteral';

export const factor = ({ ast, execObject }: IInterpreterRules<any>) => {
  if (ast.children.NumberLiteral !== undefined) {
    return numberLiteral({ ast, execObject });
  } else if (ast.children.DotsIdentifier !== undefined) {
    return dotsIdentifier({ ast, execObject });
  } else if (ast.children.BoolLiteral !== undefined) {
    return booleanLiteral({ ast, execObject });
  } else if (ast.children.StringLiteral !== undefined) {
    return stringLiteral({ ast, execObject });
  } else if (ast.children.parentheses !== undefined) {
    return parenthesisExpression({ ast, execObject });
  } else if (ast.children.arrayExpression !== undefined) {
    return arrayExpression({ ast, execObject });
  } else if (ast.children.arrayElement !== undefined) {
    return arrayElement({ ast, execObject });
  } else if (ast.children.object !== undefined) {
    return objectLiteral({ ast, execObject });
  }

  return {
    name: LiteralTokens.DebugLiteral,
    image: null,
  };
};
