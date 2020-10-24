import { IInterpreterRules } from './types';
import { Classes } from '../class';
import { Operators } from '../operators';

export const term = ({ ast, manager, execObject }: IInterpreterRules) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (rule !== Operators.MultiplicationOperator) {
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
