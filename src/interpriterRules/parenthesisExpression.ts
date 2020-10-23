import { IInterpreterRules } from './types';

export const parenthesisExpression = ({ ast, manager, execObject }: IInterpreterRules) => {
  Object.keys(ast.children).forEach((rule) => {
    for (let line of ast.children[rule]) {
      execObject.interpreter({ ast: line, manager, execObject });
    }
  });
};
