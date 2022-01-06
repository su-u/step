import { IInterpreterRules } from './types';
import { BooleanLiteralTokens } from '../tokens';
import { VariableManager } from '../manager';
import { toBoolean } from '../class/booleanClass';
import { IfStatement } from '../types/ast';

export const ifStatement = ({ ast, execObject }: IInterpreterRules<IfStatement>) => {
  const condition = execObject.interpreter({
    ast: ast.children.conditionalExpression[0],
    execObject,
  });
  const bool = toBoolean(condition);
  if (bool.image === BooleanLiteralTokens.true) {
    return execObject.interpreter({
      ast: ast.children.rules[0],
      execObject: {
        manager: {
          variable: new VariableManager(execObject.manager.variable),
          function: execObject.manager.function,
        },
        interpreter: execObject.interpreter,
      },
    });
  } else if (ast.children.rules.length >= 2) {
    return execObject.interpreter({
      ast: ast.children.rules[1],
      execObject: {
        manager: {
          variable: new VariableManager(execObject.manager.variable),
          function: execObject.manager.function,
        },
        interpreter: execObject.interpreter,
      },
    });
  }
};
