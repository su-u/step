import { IInterpreterRules } from './types';
import { getIndex } from '../util/ast';
import { Assignment } from '../types/ast';

export const assignment = ({ ast, execObject }: IInterpreterRules<Assignment>) => {
  const obj = ast.children.rules[0];
  const from = execObject.interpreter({ ast: obj.children.head[0], execObject });
  if (obj.children.tail !== undefined) {
    const toObject = obj.children.tail[0];

    if (toObject.name === 'ArrayElement') {
      const name = toObject.children.IdentifierSuffix[0].image.slice(0, -1);
      const index = getIndex({ ast: toObject.children.rules[0], execObject });
      execObject.manager.variable.assignment(name, from, index);
    } else {
      execObject.manager.variable.assignment(toObject.image, from);
    }
    return toObject;
  }
  return;
};
