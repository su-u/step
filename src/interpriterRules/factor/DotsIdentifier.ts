import { IInterpreterRules } from '../types';

export const DotsIdentifier = ({ ast, manager }: IInterpreterRules<Factor>) => {
  return manager.variable.reference(ast.children.DotsIdentifier[0].image);
};
