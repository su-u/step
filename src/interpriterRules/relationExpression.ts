import { IInterpreterRules } from './types';
import { Operators } from '../operators';
import { Classes } from '../class';

export const relationExpression = ({ ast, scope, interpreter }: IInterpreterRules) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (![Operators.TildeToken, Operators.LessThan].includes(rule)) {
      return ast.children[rule].map((x) => {
        return interpreter(x, scope, interpreter);
      });
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  // console.log('r', [literals, operators]);
  return literals.reduce((a, c, i) => {
    const name = c.name;
    return Classes[name][operators[i - 1]](c, a);
  });
};
