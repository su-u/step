import { IInterpreterRules } from './types';
import { Operators } from '../operators';
import { Classes } from '../class';
import { TypeError } from '../error';
import { Expression } from '../types/ast';

export const expression = ({ ast, execObject }: IInterpreterRules<Expression>) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (rule !== Operators.AdditionOperators) {
      return ast.children[rule].map((x) => {
        return execObject.interpreter({ ast: x, execObject });
      });
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  return literals.reduce((a, c, i) => {
    const name = c.name;
    return calc(name, operators, i - 1, a, c);
  });
};

const calc = (name, operators, i, a, b) => {
  let result = {};
  try {
    result = Classes[name][operators[i]](b, a);
  } catch (e) {
    throw new TypeError('演算子がありません。');
  }
  return result;
};
