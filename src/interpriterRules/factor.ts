import { IInterpreterRules } from './types';
import { LiteralTokens } from '../tokens';
import { identifier } from './factor/identifier';
import { booleanLiteral } from './factor/boolLiteral';
import { numberLiteral } from './factor/numberLiteral';
import { stringLiteral } from './factor/stringLiteral';
import { parenthesisExpression } from './factor/parenthesisExpression';
import { arrayExpression } from './factor/ArrayExpression';
import { arrayElement } from './factor/arrayElement';
import { objectLiteral } from './factor/objectLiteral';

export const factor = ({ ast, manager, execObject }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    return numberLiteral({ ast, manager, execObject });
  } else if (ast.children.Identifier !== undefined) {
    return identifier({ ast, manager, execObject });
  } else if (ast.children.BoolLiteral !== undefined) {
    return booleanLiteral({ ast, manager, execObject });
  } else if (ast.children.StringLiteral !== undefined) {
    return stringLiteral({ ast, manager, execObject });
  } else if (ast.children.parentheses !== undefined) {
    return parenthesisExpression({ ast, manager, execObject });
  } else if (ast.children.arrayExpression !== undefined) {
    return arrayExpression({ ast, manager, execObject });
  } else if (ast.children.arrayElement !== undefined) {
    return arrayElement({ ast, manager, execObject });
  } else if (ast.children.Object !== undefined) {
    return objectLiteral({ ast, manager, execObject });
  }

  return {
    name: LiteralTokens.DebugLiteral,
    image: null,
  };
};
