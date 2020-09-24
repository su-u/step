import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const term = ({ ast }: IInterpreterRules) => {
  const t = Object.keys(ast.children);
  const result = t.map((rule) => {
    if (ast.children.Factor >= 2) {
      if (ast.children[rule][0].image === undefined) {
        console.log(ast.children[rule][1]);
        const a = interpreter(ast.children[rule][0]);
        const b = interpreter(ast.children[rule][1]);
        return [...a, ...b];
      } else {
        return ast.children[rule][0].image;
      }
    } else {
      if (ast.children[rule][0].image === undefined) {
        const a = interpreter(ast.children[rule][0]);
        return a;
      } else {
        return ast.children[rule][0].image;
      }
    }
  });
  return result;
};
