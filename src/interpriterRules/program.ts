import { IInterpreterRules } from './types';

export const program = ({ ast, manager, execObject }: IInterpreterRules) => {
  let last = undefined;
  Object.keys(ast.children).forEach((rule) => {
    for (let line of ast.children[rule]) {
      last = execObject.interpreter({ ast: line, manager, execObject });
    }
  });
  return last;
};
