import { IInterpreterRules } from './types';
import { BlockStatement } from '../types/ast';

export const blockStatement = ({ ast, execObject }: IInterpreterRules<BlockStatement>) => {
  return ast.children.rules.reduce((ac, line) => {
    return execObject.interpreter({ ast: line.children.rules[0], execObject });
  }, {});
};
