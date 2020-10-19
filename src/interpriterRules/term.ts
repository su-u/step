import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';
import { Classes } from "../class";
import { Operators } from "../types/operators";

export const term = ({ ast }: IInterpreterRules) => {
  const [literals, operators ] = Object.keys(ast.children).map((rule) => {
    if (rule !== Operators.MultiplicationOperator) {
      return ast.children[rule].map((x) => {
        return interpreter(x);
      });
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  // console.log('t', result);
  return literals.reduce((a, c, i) => {
    const name = c.name;
    return Classes[name][operators[i - 1]](c, a);
  })
};
