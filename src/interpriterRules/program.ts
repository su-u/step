import { IInterpreterRules } from './types';

export const program = ({ ast, manager, execObject }: IInterpreterRules) => {
  return ast.children.rule.reduce((ac, line) => {
    return execObject.interpreter({ ast: line.children.rule[0], manager, execObject });
  }, undefined);
};
