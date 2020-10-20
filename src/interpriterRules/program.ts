import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const program = ({ ast, status }: IInterpreterRules) => {
  let last = undefined;
  Object.keys(ast.children).forEach((rule) => {
    for (let line of ast.children[rule]) {
      last = interpreter(line, status);
    }
  });
  return last;
};
