import { IInterpreterRules } from '../types';

export const identifier = ({ ast, manager }: IInterpreterRules) => {
  // manager.variable.debug()
  // console.log('i', manager.variable.reference(ast.children.Identifier[0].image));
  return manager.variable.reference(ast.children.Identifier[0].image);
};
