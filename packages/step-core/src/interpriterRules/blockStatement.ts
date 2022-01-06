import { IInterpreterRules } from './types';
import { BlockStatement } from '../types/ast';

export const blockStatement = ({ ast, context }: IInterpreterRules<BlockStatement>) => {
  return ast.children.rules.reduce((ac, line) => {
    return context.interpreter({ ast: line.children.rules[0], context });
  }, {});
};
