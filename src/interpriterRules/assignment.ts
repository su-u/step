import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';
import { variableManager } from '../manager';

export const assignment = ({ ast }: IInterpreterRules) => {
  const key = Object.keys(ast.children)[0];
  if (key === 'ToRight') {
    const obj = ast.children.ToRight[0];
    const from = interpreter(obj.children.from[0]);
    const toObject = obj.children.to[0];
    variableManager.assignment(toObject, from);
  } else {
    const obj = ast.children.ToLeft[0];
    const from = interpreter(obj.children.from[0]);
    const toObject = obj.children.to[0];
    variableManager.assignment(toObject, from);
  }
};
