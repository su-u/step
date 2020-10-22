import { IInterpreterRules } from './types';
import { LiteralTokens, BooleanLiteralTokens } from '../tokens';
import { AllLiteralType } from '../types/literal';

export const ifStatement = ({ ast, scope, interpreter }: IInterpreterRules) => {
  const condition = interpreter(ast.children.conditionalExpression[0], scope, interpreter);
  if (isTrue(condition)) {
    return interpreter(ast.children.BlockStatement[0], scope, interpreter);
  } else {
    return interpreter(ast.children.BlockStatement[1], scope, interpreter);
  }
};

export const isTrue = (condition: AllLiteralType) => {
  if (condition.name === LiteralTokens.BooleanLiteral) {
    return condition.image === BooleanLiteralTokens.true;
  } else if (condition.name === LiteralTokens.NumberLiteral) {
    return condition.image > 0;
  }
};
