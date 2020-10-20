import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const pipe = ({ ast, scope }: IInterpreterRules) => {
  const childrenAst = ast.children.RelationExpression[0];
  if (ast.children.PipeToken !== undefined) {
    interpreter(ast.children.to[0], scope);
  }
  return interpreter(childrenAst, scope);
};
