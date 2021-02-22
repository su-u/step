import { IInterpreterRules } from './types';
import { getIndex } from '../util/ast';

export const assignment = ({ ast, manager, execObject }: IInterpreterRules) => {
  const obj = ast.children.rules[0];
  const from = execObject.interpreter({ ast: obj.children.head[0], manager, execObject });
  if (obj.children.tail !== undefined) {
    const toObject = obj.children.tail[0];

    if (toObject.name === 'ArrayElement') {
      const name = toObject.children.IdentifierSuffix[0].image.slice(0, -1);
      const index = getIndex({ ast: toObject.children.rules[0], manager, execObject });
      manager.variable.assignment(name, from, index);
    } else {
      manager.variable.assignment(toObject.image, from);
    }
    return toObject;
  }
  return;
};
