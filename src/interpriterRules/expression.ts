import { IInterpreterRules } from './types';
import { Operators } from '../operators';
import { Classes } from '../class';

export const expression = ({ ast, manager, execObject }: IInterpreterRules) => {
  // console.log('a', ast.children);
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (rule !== Operators.AdditionOperator) {
      return ast.children[rule].map((x) => {
        return execObject.interpreter({ ast: x, manager, execObject });
      });
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  // console.log('el', literals);
  // console.log('e', literals, operators);
  // console.log('er', literals.reduce((a, c, i) => {
  //   const name = c.name;
  //   return Classes[name][operators[i - 1]](c, a);
  // }));
  return literals.reduce((a, c, i) => {
    const name = c.name;
    return Classes[name][operators[i - 1]](c, a);
  });
};
