import { IInterpreterRules } from './types';
import { BooleanLiteralTokens } from '../tokens';
import { VariableManager } from '../manager';
import { toBoolean } from '../class/booleanClass';
import { IfStatement } from '../types/ast';

export const ifStatement = ({ ast, context }: IInterpreterRules<IfStatement>) => {
  const condition = context.interpreter({
    ast: ast.children.conditionalExpression[0],
    context,
  });
  const bool = toBoolean(condition);
  if (bool.image === BooleanLiteralTokens.true) {
    return context.interpreter({
      ast: ast.children.rules[0],
      context: {
        manager: {
          variable: new VariableManager(context.manager.variable),
          function: context.manager.function,
        },
        interpreter: context.interpreter,
      },
    });
  } else if (ast.children.rules.length >= 2) {
    return context.interpreter({
      ast: ast.children.rules[1],
      context: {
        manager: {
          variable: new VariableManager(context.manager.variable),
          function: context.manager.function,
        },
        interpreter: context.interpreter,
      },
    });
  }
};
