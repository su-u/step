import { IInterpreterRules } from './types';
import { getIndex } from '../util/ast';

export const assignment = ({ ast, manager, execObject }: IInterpreterRules) => {
  const obj = ast.children.ToRight[0];
  const from = execObject.interpreter({ ast: obj.children.from[0], manager, execObject });
  if (obj.children.to !== undefined) {
    const toObject = obj.children.to[0];

    if (toObject.name === 'ArrayElement') {
      const name = toObject.children.IdentifierSuffix[0].image.slice(0, -1);
      const index = getIndex({ ast: toObject.children.index[0], manager, execObject });
      manager.variable.assignment(name, from, index);
    } else {
      manager.variable.assignment(toObject.image, from);
    }
    return toObject;
  }
  return;
};
