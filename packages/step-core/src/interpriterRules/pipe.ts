import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';
import { execMatch } from './pipe/match';

export const pipe = ({ ast, context }: IInterpreterRules<any>) => {
  const childrenAst = ast.children.head[0];
  let fromValue = context.interpreter({ ast: childrenAst, context: context });
  if (ast.children.tail) {
    fromValue = ast.children.tail.reduce((last, pipeAst) => {
      if (pipeAst.children.toEach) {
        return execEach({ ast: pipeAst, context: context }, last);
      } else if (pipeAst.children.DotsIdentifier) {
        return execFunction({ ast: pipeAst, context: context }, last);
      } else if (pipeAst.children.toMatch) {
        return execMatch({ ast: pipeAst, context: context }, last);
      }
    }, fromValue);
  }
  return fromValue;
};
