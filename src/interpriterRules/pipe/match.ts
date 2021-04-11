import _ from 'lodash';
import { IInterpreterRules } from '../types';

export const execMatch = ({ ast, execObject }: IInterpreterRules<any>, last) => {
  const value = Array.isArray(last) ? last.map((v) => v.value) : [last];
  const matchList = ast.toMatch[0].children.rules.map((expression) => {
    const conditions = getConditions({ ast: expression, execObject });
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

  return m === null ? value : execObject.interpreter({ ast: m.program, execObject });
};

const getConditions = ({ ast, execObject }: IInterpreterRules<any>) => {
  if (ast.children.arguments !== undefined) {
    return ast.children.arguments.map((expression) => {
      return execObject.interpreter({
        ast: expression,
        execObject,
      });
    });
  } else {
    return null;
  }
};
