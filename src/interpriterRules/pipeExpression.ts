import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';
import { execMatch } from './pipe/match';

export const pipeExpression = ({ ast, execObject }: IInterpreterRules<any>) => {
  const fromAst = ast.children.head[0];
  let fromValue = execObject.interpreter({ ast: fromAst, execObject });
  if (ast.children.tail !== undefined) {
    fromValue = ast.children.tail.reduce((last, pipeAst) => {
      const pipeExpressionAst = pipeAst.children.rules[0].children;
      // console.log(pipeExpressionAst);
      // console.log(fromValue);
      if (pipeExpressionAst.toEach !== undefined) {
        return execEach({ ast: pipeExpressionAst, execObject }, last);
      } else if (pipeExpressionAst.DotsIdentifier !== undefined) {
        return execFunction({ ast: pipeExpressionAst, execObject }, last);
      } else if (pipeExpressionAst.toMatch !== undefined) {
        return execMatch({ ast: pipeExpressionAst, execObject }, last);
      }
    }, fromValue);
  }
  return fromValue;
};
