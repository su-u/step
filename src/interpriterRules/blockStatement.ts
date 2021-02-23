import { IInterpreterRules } from './types';

export const blockStatement = ({ ast, manager, execObject }: IInterpreterRules<BlockStatement>) => {
  return ast.children.rules.reduce((ac, line) => {
    return execObject.interpreter({ ast: line.children.rules[0], manager, execObject });
  }, {});
};
