import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';
import { Classes } from '../class';

export const pipe = ({ ast, scope }: IInterpreterRules) => {
  const childrenAst = ast.children.RelationExpression[0];
  const value = interpreter(childrenAst, scope);
  if (ast.children.PipeToken !== undefined) {
    if (ast.children.toEach !== undefined) {
      return interpreter(ast.children.toEach[0], scope);
    } else if (ast.children.toIdentifier !== undefined) {
      const objName = ast.children.toIdentifier[0].image;
      return Classes[objName]['default'](value);
    }
  }
  return;
};
