import { IInterpreterRules } from './types';
import { RelationalOperatorTokens } from '../operators';
import { Classes } from '../class';

export const relationExpression = ({ ast, manager, execObject }: IInterpreterRules) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (!RelationalOperatorTokens.includes(rule)) {
      return ast.children[rule].map((x) => {
        return execObject.interpreter({ ast: x, manager, execObject });
      });
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  return literals.reduce((a, c, i) => {
    const name = c.name;
    return Classes[name][operators[i - 1]](c, a);
  });
};
