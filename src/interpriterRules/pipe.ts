import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';

export const pipe = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  const tail = ast.children.tail[0];
  const value = execObject.interpreter({ ast: childrenAst, manager, execObject });
  if (tail.children.PipeToken !== undefined) {
    if (tail.children.toEach !== undefined) {
      return execEach({ ast, manager, execObject });
    } else if (tail.children.toIdentifier !== undefined) {
      return execFunction({ ast, manager, execObject });
    }
  }
  return value;
};
