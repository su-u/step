import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';
import { execMatch } from './pipe/match';

export const pipeExpression = ({ ast, manager, execObject }: IInterpreterRules) => {
  const fromAst = ast.children.head[0];
  let fromValue = execObject.interpreter({ ast: fromAst, manager, execObject });
  if (ast.children.tail !== undefined) {
    fromValue = ast.children.tail.reduce((last, pipeAst) => {
      const pipeExpressionAst = pipeAst.children.rules[0].children;
      // console.log(pipeExpressionAst);
      // console.log(fromValue);
      if (pipeExpressionAst.toEach !== undefined) {
        return execEach({ ast: pipeExpressionAst, manager, execObject }, last);
      } else if (pipeExpressionAst.Identifier !== undefined) {
        return execFunction({ ast: pipeExpressionAst, manager, execObject }, last);
      } else if (pipeExpressionAst.toMatch !== undefined) {
        return execMatch({ ast: pipeExpressionAst, manager, execObject }, last);
      }
    }, fromValue);
  }
  return fromValue;
};
