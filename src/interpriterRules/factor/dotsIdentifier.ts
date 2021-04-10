import { IInterpreterRules } from '../types';
import { Factor } from '../../types/ast';

export const dotsIdentifier = ({ ast, execObject }: IInterpreterRules<Factor>) => {
  const identifier = ast.children.DotsIdentifier[0].children.identifier;

  if (identifier.length === 1) {
    return execObject.manager.variable.reference(identifier[0].image);
  } else {
  }
};
