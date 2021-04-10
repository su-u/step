import { IInterpreterRules } from '../types';
import { Factor } from '../../types/ast';

export const dotsIdentifier = ({ ast, manager }: IInterpreterRules<Factor>) => {
  // console.log(ast.children.DotsIdentifier[0].children);
  const identifier = ast.children.DotsIdentifier[0].children.identifier;
  // console.log(identifier);

  if (identifier.length === 1) {
    return manager.variable.reference(identifier[0].image);
  } else {
  }
};
