import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';
import { execMatch } from './pipe/match';

export const pipe = ({ ast, manager, execObject }: IInterpreterRules<any>) => {
  const childrenAst = ast.children.from[0];
  let fromValue = execObject.interpreter({ ast: childrenAst, manager, execObject });
  if (ast.children.tail !== undefined) {
    fromValue = ast.children.tail.reduce((last, pipeAst) => {
      if (pipeAst.children.toEach !== undefined) {
        return execEach({ ast: pipeAst, manager, execObject }, last);
      } else if (pipeAst.children.toIdentifier !== undefined) {
        return execFunction({ ast: pipeAst, manager, execObject }, last);
      } else if (pipeAst.children.toMatch !== undefined) {
        return execMatch({ ast: pipeAst, manager, execObject }, last);
      }
    }, fromValue);
  }
  return fromValue;
};
