import { IInterpreterRules } from './types';

export const blockStatement = ({ ast, scope, interpreter }: IInterpreterRules) => {
  Object.keys(ast.children).forEach((rule) => {
    for (let line of ast.children[rule]) {
      interpreter(line, scope, interpreter);
    }
  });
};
