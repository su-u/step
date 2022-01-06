import { IInterpreterRules } from '../types';
import { Factor } from '../../types/ast';

export const dotsIdentifier = ({ ast, context }: IInterpreterRules<Factor>) => {
  const identifier = ast.children.DotsIdentifier[0].children.identifier;

  if (identifier.length === 1) {
    return context.manager.variable.reference(identifier[0].image);
  } else {
  }
};
