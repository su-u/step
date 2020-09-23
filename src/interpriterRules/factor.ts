import { IInterpreterRules } from './types';

export const factor = ({ ast }: IInterpreterRules) => {
  Object.keys(ast.children).forEach((rule) => {
    return ast.children[rule][0].image;
  });
};
