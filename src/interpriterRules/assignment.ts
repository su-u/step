import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';
import { variableManager } from '../manager';

export const assignment = ({ ast, scope }: IInterpreterRules) => {
  const key = Object.keys(ast.children)[0];
  if (key === 'ToRight') {
    const obj = ast.children.ToRight[0];
    const from = interpreter(obj.children.from[0], scope);
    if (obj.children.to !== undefined) {
      const toObject = obj.children.to[0];
      scope ? scope.assignment(toObject.image, from) :
      variableManager.assignment(toObject.image, from);
      return toObject;
    }
    return;
  } else {
    const obj = ast.children.ToLeft[0];
    const from = interpreter(obj.children.from[0]);
    if (obj.children.to !== undefined) {
      const toObject = obj.children.to[0];
      scope ? scope.assignment(toObject.image, from) :
        variableManager.assignment(toObject.image, from);
      return toObject;
    }
    return;
  }
};
