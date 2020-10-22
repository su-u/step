import { IInterpreterRules } from './types';

export const ifStatement = ({ ast, scope, interpreter }: IInterpreterRules) => {
  const condition = interpreter(ast.children.conditionalExpression[0], scope, interpreter);
  console.log(condition);
  if (condition.image === 'true') {
    console.log(true);
    return interpreter(ast.children.BlockStatement[0], scope, interpreter);
  } else {
    // return interpreter(ast.children.BlockStatement[0], scope, interpreter);
  }
};
