import { IInterpreterRules } from './types';
import { getIndex } from '../util/ast';
import { Assignment } from '../types/ast';
import { Rules } from '../rules';

export const assignment = ({ ast, context }: IInterpreterRules<Assignment>) => {
  const obj = ast.children.rules[0];
  const from = context.interpreter({ ast: obj.children.head[0], context });
  if (obj.children.tail) {
    const toObject = obj.children.tail[0];

    if (toObject.name === Rules.ArrayElement) {
      const name = toObject.children.IdentifierSuffix[0].image.slice(0, -1);
      const index = getIndex({ ast: toObject.children.rules[0], context });
      context.manager.variable.assignment(name, from, index);
    } else {
      context.manager.variable.assignment(toObject.image, from);
    }
    return toObject;
  }
  return;
};
