import { IInterpreterRules } from './types';

export const program = ({ ast, scope, interpreter}: IInterpreterRules) => {
  let last = undefined;
  Object.keys(ast.children).forEach((rule) => {
    for (let line of ast.children[rule]) {
      last = interpreter(line, scope, interpreter);
    }
  });
  return last;
};
