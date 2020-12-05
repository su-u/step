import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';
import { execMatch } from './pipe/match';

export const pipe = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  let value = execObject.interpreter({ ast: childrenAst, manager, execObject });
  if (ast.children.tail !== undefined) {
    Object.values(ast.children.tail).forEach((pipeAst: any, i: number) => {
      if (pipeAst.children.toEach !== undefined) {
        value = execEach({ ast: pipeAst, manager, execObject }, value);
      } else if (pipeAst.children.toIdentifier !== undefined) {
        value = execFunction({ ast: pipeAst, manager, execObject }, value);
      } else if (pipeAst.children.toMatch !== undefined) {
        value = execMatch({ ast: pipeAst, manager, execObject }, value);
      }
    });
  }
  return value;
};
