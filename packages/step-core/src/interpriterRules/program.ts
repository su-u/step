import { IInterpreterRules } from './types';
import { ProgramRoot } from '../types/ast';

export const program = ({ ast, context }: IInterpreterRules<ProgramRoot>) => {
  return ast.children.rules.reduce((ac, line) => {
    return context.interpreter({ ast: line.children.rules[0], context });
  }, {});
};
