import { IInterpreterRules } from './types';
import { LiteralTokens, BooleanLiteralTokens } from '../tokens';
import { AllLiteralType } from '../types/literal';
import { VariableManager } from '../manager';

export const ifStatement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const condition = execObject.interpreter({
    ast: ast.children.conditionalExpression[0],
    manager,
    execObject,
  });
  if (isTrue(condition)) {
    return execObject.interpreter({
      ast: ast.children.BlockStatement[0],
      manager: { variable: new VariableManager(manager.variable), function: manager.function },
      execObject,
    });
  } else if (ast.children.BlockStatement.length >= 2) {
    return execObject.interpreter({
      ast: ast.children.BlockStatement[1],
      manager: { variable: new VariableManager(manager.variable), function: manager.function },
      execObject,
    });
  }
};

export const isTrue = (condition: AllLiteralType) => {
  if (condition.name === LiteralTokens.BooleanLiteral) {
    return condition.image === BooleanLiteralTokens.true;
  } else if (condition.name === LiteralTokens.NumberLiteral) {
    return condition.image > 0;
  }
};
