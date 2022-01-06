import { IInterpreterRules } from './types';
import { execEach } from './pipe/each';
import { execFunction } from './pipe/function';
import { execMatch } from './pipe/match';

export const pipeExpression = ({ ast, context }: IInterpreterRules<any>) => {
  const fromAst = ast.children.head[0];
  let fromValue = context.interpreter({ ast: fromAst, context: context });
  if (ast.children.tail) {
    fromValue = ast.children.tail.reduce((last, pipeAst) => {
      const pipeExpressionAst = pipeAst.children.rules[0].children;
      // console.log(pipeExpressionAst);
      // console.log(fromValue);
      if (pipeExpressionAst.toEach) {
        return execEach({ ast: pipeExpressionAst, context: context }, last);
      } else if (pipeExpressionAst.DotsIdentifier) {
        return execFunction({ ast: pipeExpressionAst, context: context }, last);
      } else if (pipeExpressionAst.toMatch) {
        return execMatch({ ast: pipeExpressionAst, context: context }, last);
      }
    }, fromValue);
  }
  return fromValue;
};
