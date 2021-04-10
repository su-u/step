import { IInterpreterRules } from './types';
import { ProgramRoot } from '../types/ast';

export const program = ({ ast, execObject }: IInterpreterRules<ProgramRoot>) => {
  return ast.children.rules.reduce((ac, line) => {
    return execObject.interpreter({ ast: line.children.rules[0], execObject });
  }, {});
};
