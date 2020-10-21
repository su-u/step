import { IInterpreterRules } from './types';
import { Operators } from '../types/operators';
import { Classes } from '../class';

export const expression = ({ ast, scope, interpreter }: IInterpreterRules) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (rule !== Operators.AdditionOperator) {
      return ast.children[rule].map((x) => {
        return interpreter(x, scope, interpreter);
      });
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  // console.log('e', [literals, operators]);
  return literals.reduce((a, c, i) => {
    const name = c.name;
    return Classes[name][operators[i - 1]](c, a);
  });
};
