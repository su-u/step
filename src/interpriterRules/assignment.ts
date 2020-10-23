import { IInterpreterRules } from './types';

export const assignment = ({ ast, manager, execObject }: IInterpreterRules) => {
  const key = Object.keys(ast.children)[0];
  if (key === 'ToRight') {
    const obj = ast.children.ToRight[0];
    const from = execObject.interpreter({ ast: obj.children.from[0], manager, execObject });
    if (obj.children.to !== undefined) {
      const toObject = obj.children.to[0];
      manager.variable.assignment(toObject.image, from);

      return toObject;
    }
    return;
  } else {
    const obj = ast.children.ToLeft[0];
    const from = execObject.interpreter({ ast: obj.children.from[0], manager, execObject });
    if (obj.children.to !== undefined) {
      const toObject = obj.children.to[0];
      manager.variable.assignment(toObject.image, from);

      return toObject;
    }
    return;
  }
};
