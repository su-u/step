import { IInterpreterRules } from './types';
import { LogicalOperatorTokens } from '../operators';
import { Classes } from '../class';
import { LogicExpression } from '../types/ast';

export const logicExpression = ({ ast, context }: IInterpreterRules<LogicExpression>) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (!LogicalOperatorTokens.includes(rule as any)) {
      return ast.children[rule].map((x) => {
        return context.interpreter({ ast: x, context });
      });
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  // console.log(literals, operators);
  return literals.reduce((a, c, i) => {
    const name = c.name;
    return Classes[name][operators[i - 1]](c, a);
  });
};
