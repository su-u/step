import { IInterpreterRules } from './types';
import { Classes } from '../class';
import { ScopeManager } from '../manager';

export const pipe = ({ ast, scope, interpreter }: IInterpreterRules) => {
  const childrenAst = ast.children.RelationExpression[0];
  const value = interpreter(childrenAst, scope, interpreter);
  if (ast.children.PipeToken !== undefined) {
    if (ast.children.toEach !== undefined) {
      const eachObj = ast.children.toEach[0];
      const range = Array.from(Array(value.end - value.start + 1).keys(), (x) => x + value.start);
      range.forEach((i) => {
        const inScopeManger = new ScopeManager(scope);
        if (eachObj.children.Identifier !== undefined) {
          inScopeManger.assignment(eachObj.children.Identifier[0].image, {
            name: 'NumberLiteral',
            image: i,
          });
        }
        interpreter(eachObj.children.Program[0], inScopeManger, interpreter);
      });
      return;
    } else if (ast.children.toIdentifier !== undefined) {
      const objName = ast.children.toIdentifier[0].image;
      return Classes[objName]['default'](value);
    }
  }
  return value;
};
