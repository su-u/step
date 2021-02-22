import _ from 'lodash';
import { IInterpreterRules } from '../types';

export const execMatch = ({ ast, manager, execObject }: IInterpreterRules, last) => {
  const value = Array.isArray(last) ? last.map((v) => v.value) : [last];
  const matchList = ast.toMatch[0].children.MatchExpression.map((expression) => {
    const conditions = getConditions({ ast: expression, manager, execObject });
    const program = expression.children.rules[0];
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
