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
import { Factor } from '../types/ast';

export const factor = ({ ast, execObject }: IInterpreterRules<Factor>) => {
  if (ast.children.NumberLiteral) {
    return numberLiteral({ ast, execObject });
  } else if (ast.children.DotsIdentifier) {
    return dotsIdentifier({ ast, execObject });
  } else if (ast.children.BoolLiteral) {
    return booleanLiteral({ ast, execObject });
  } else if (ast.children.StringLiteral) {
    return stringLiteral({ ast, execObject });
  } else if (ast.children.parentheses) {
    return parenthesisExpression({ ast, execObject });
  } else if (ast.children.arrayExpression) {
    return arrayExpression({ ast, execObject });
  } else if (ast.children.arrayElement) {
    return arrayElement({ ast, execObject });
  } else if (ast.children.object) {
    return objectLiteral({ ast, execObject });
  }

  return {
    name: LiteralTokens.DebugLiteral,
    image: null,
  };
};
