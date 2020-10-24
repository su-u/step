import { IInterpreterRules } from '../types';

export const identifier = ({ ast, manager }: IInterpreterRules) => {
  return manager.variable.reference(ast.children.Identifier[0].image);
};
