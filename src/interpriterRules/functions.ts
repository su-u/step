import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const functionStatement = ({ ast }: IInterpreterRules) => {
  Object.keys(ast.children).forEach((rule) => {
    for (let line of ast.children[rule]) {
      interpreter(line);
    }
  });
};
