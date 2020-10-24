import { IInterpreterRules } from './types';
import { LiteralTokens } from '../tokens';
import { callFunction } from "./factor/callFunction";
import { identifier } from "./factor/identifier";
import { booleanLiteral } from "./factor/boolLiteral";

export const factor = ({ ast, manager, execObject }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    const image = Number(ast.children.NumberLiteral[0].image);
    return {
      name: LiteralTokens.NumberLiteral,
      image,
    };
  } else if (ast.children.Identifier !== undefined) {
    return identifier({ ast, manager, execObject })
  } else if (ast.children.BoolLiteral !== undefined) {
    return booleanLiteral({ ast, manager, execObject })
  } else if (ast.children.StringLiteral !== undefined) {
    const image = ast.children.StringLiteral[0].image.slice(1).slice(0, -1);
    return {
      name: LiteralTokens.StringLiteral,
      image,
    };
  } else if (ast.children.ParenthesisExpression !== undefined) {
    return execObject.interpreter({ ast: ast.children.ParenthesisExpression[0].children.expression[0], manager, execObject })
  }
  return {
    name: LiteralTokens.DebugLiteral,
    image: null,
  };
};
