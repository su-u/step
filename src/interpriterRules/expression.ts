import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const expression = ({ ast }: IInterpreterRules) => {
  const result = Object.keys(ast.children).map((rule) => {
    if (ast.children[rule][0].image === undefined) {
      const a = interpreter(ast.children[rule][0]);
      const b = interpreter(ast.children[rule][1]);
      return [...a, ...b];
    } else {
      return ast.children[rule][0].image;
    }
  });
  return result;
};
