import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const term = ({ ast }: IInterpreterRules) => {
  return Object.keys(ast.children).map((rule) => {
    ast.children[rule].map((line) => {
      return interpreter(line);
    });
  });
};
