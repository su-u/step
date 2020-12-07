import { IInterpreterRules } from './types';

export const blockStatement = ({ ast, manager, execObject }: IInterpreterRules) => {
  return ast.children.BlockRule.reduce((ac, line) => {
    return execObject.interpreter({ ast: line.children.rule[0], manager, execObject });
  }, undefined);
};
