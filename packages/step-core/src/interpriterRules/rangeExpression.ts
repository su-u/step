import { IInterpreterRules } from './types';
import { RangeOperatorTokens } from '../operators';
import { Classes } from '../class';
import { TypeError } from '../error';
import { RangeExpression } from '../types/ast';

export const rangeExpression = ({ ast, execObject }: IInterpreterRules<RangeExpression>) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (!RangeOperatorTokens.includes(rule as any)) {
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
