import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';
import { execMatch } from './pipe/match';

export const pipe = ({ ast, execObject }: IInterpreterRules<any>) => {
  const childrenAst = ast.children.head[0];
  let fromValue = execObject.interpreter({ ast: childrenAst, execObject });
  if (ast.children.tail) {
    fromValue = ast.children.tail.reduce((last, pipeAst) => {
      if (pipeAst.children.toEach) {
        return execEach({ ast: pipeAst, execObject }, last);
      } else if (pipeAst.children.DotsIdentifier) {
        return execFunction({ ast: pipeAst, execObject }, last);
      } else if (pipeAst.children.toMatch) {
        return execMatch({ ast: pipeAst, execObject }, last);
      }
    }, fromValue);
  }
  return fromValue;
};
