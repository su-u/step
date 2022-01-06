import _ from 'lodash';
import { IInterpreterRules } from '../types';

export const execMatch = ({ ast, context }: IInterpreterRules<any>, last) => {
  const value = Array.isArray(last) ? last.map((v) => v.value) : [last];
  const matchList = ast.toMatch[0].children.rules.map((expression) => {
    const conditions = getConditions({ ast: expression, context: context });
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

  return m === null ? value : context.interpreter({ ast: m.program, context: context });
};

const getConditions = ({ ast, context }: IInterpreterRules<any>) => {
  if (ast.children.arguments !== undefined) {
    return ast.children.arguments.map((expression) => {
      return context.interpreter({
        ast: expression,
        context: context,
      });
    });
  } else {
    return null;
  }
};
