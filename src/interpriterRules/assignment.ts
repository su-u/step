import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';
import { variableManager } from '../manager';

export const assignment = ({ ast }: IInterpreterRules) => {
  const key = Object.keys(ast.children)[0];
  if (key === 'ToRight') {
    const from = interpreter(ast.children.ToRight[0].children.from[0]);
    // console.log('f', from);
    const toObject = ast.children.ToRight[0].children.to[0];
    variableManager.assignment(toObject, from);
  } else {
    // const from = interpreter(ast.children.from[0]);
    // const op = ast.children.ToLeftToken[0];
    // const to = interpreter(ast.children.to[0]);
  }
};
