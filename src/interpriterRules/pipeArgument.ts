import { IInterpreterRules } from './types';
import { Classes } from '../class';
import { VariableManager } from '../manager';

export const pipeArgument = ({ ast, manager, execObject }: IInterpreterRules) => {
  return execObject.interpreter({ ast: ast.children.RelationExpression[0], manager, execObject });
};
