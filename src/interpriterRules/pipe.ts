import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const pipe = ({ ast, scope }: IInterpreterRules) => {
  const childrenAst = ast.children.RelationExpression[0];
  return interpreter(childrenAst, scope);
};
