import _ from 'lodash';
import { IInterpreterRules } from '../types';

export const execMatch = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  const tail = ast.children.tail[0];
  const value = execObject
    .interpreter({ ast: childrenAst, manager, execObject })
    .map((v) => v.value);
  const matchAst = tail.children.toMatch[0];
  const matchList = matchAst.children.MatchExpression.map((expression) => {
    const conditions = getConditions({ ast: expression, manager, execObject });
    const program = expression.children.Program[0];
    return {
      conditions,
      program,
    };
  });
  const m =
    matchList.find(
      (expression) => _.isEqual(expression.conditions, value) || expression.conditions === null,
    ) || null;

  return m === null ? value : execObject.interpreter({ ast: m.program, manager, execObject });
};

const getConditions = ({ ast, manager, execObject }: IInterpreterRules) => {
  if (ast.children.LogicExpression !== undefined) {
    return ast.children.LogicExpression.map((expression) => {
      return execObject.interpreter({
        ast: expression,
        manager,
        execObject,
      });
    });
  } else {
    return null;
  }
};
