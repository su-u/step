import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const assignment = ({ ast }: IInterpreterRules) => {
  const key = Object.keys(ast.children)[0];
  if (key === 'ToRight') {
    const from = interpreter(ast.children.from[0]);
    const op = ast.children.ToRightToken[0];
    const to = interpreter(ast.children.to[0]);
  } else {
    const from = interpreter(ast.children.from[0]);
    const op = ast.children.ToLeftToken[0];
    const to = interpreter(ast.children.to[0]);
  }
};
