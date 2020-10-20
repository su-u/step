import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const program = ({ ast, scope }: IInterpreterRules) => {
  let last = undefined;
  Object.keys(ast.children).forEach((rule) => {
    for (let line of ast.children[rule]) {
      last = interpreter(line, scope);
    }
  });
  return last;
};
