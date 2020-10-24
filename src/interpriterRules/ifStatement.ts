import { IInterpreterRules } from './types';
import { LiteralTokens, BooleanLiteralTokens } from '../tokens';
import { AllLiteralType } from '../types/literal';

export const ifStatement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const condition = execObject.interpreter({
    ast: ast.children.conditionalExpression[0],
    manager,
    execObject,
  });
  if (isTrue(condition)) {
    return execObject.interpreter({ ast: ast.children.BlockStatement[0], manager, execObject });
  } else if (ast.children.BlockStatement.length >= 2) {
    return execObject.interpreter({ ast: ast.children.BlockStatement[1], manager, execObject });
  }
};

export const isTrue = (condition: AllLiteralType) => {
  if (condition.name === LiteralTokens.BooleanLiteral) {
    return condition.image === BooleanLiteralTokens.true;
  } else if (condition.name === LiteralTokens.NumberLiteral) {
    return condition.image > 0;
  }
};
