import { IInterpreterRules } from './types';
import { Classes } from '../class';
import { VariableManager } from '../manager';

export const pipeArgument = ({ ast, manager, execObject }: IInterpreterRules) => {
  if (ast.children.LCurly !== undefined) {

  } else {
    return execObject.interpreter({ast: ast.children.RelationExpression[0], manager, execObject});
  }
};
