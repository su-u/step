import { IInterpreterRules } from './types';
import { BooleanLiteralTokens } from '../tokens';
import { VariableManager } from '../manager';
import { toBoolean } from '../class/booleanClass';

export const ifStatement = ({ ast, manager, execObject }: IInterpreterRules) => {
  const condition = execObject.interpreter({
    ast: ast.children.conditionalExpression[0],
    manager,
    execObject,
  });
  const bool = toBoolean(condition);
  if (bool.image === BooleanLiteralTokens.true) {
    return execObject.interpreter({
      ast: ast.children.rules[0],
      manager: { variable: new VariableManager(manager.variable), function: manager.function },
      execObject,
    });
  } else if (ast.children.rules.length >= 2) {
    return execObject.interpreter({
      ast: ast.children.rules[1],
      manager: { variable: new VariableManager(manager.variable), function: manager.function },
      execObject,
    });
  }
};
