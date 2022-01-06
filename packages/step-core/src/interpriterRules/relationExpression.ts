import { IInterpreterRules } from './types';
import { RelationalOperatorTokens } from '../operators';
import { Classes } from '../class';
import { TypeError } from '../error';
import { RelationExpression } from '../types/ast';

export const relationExpression = ({ ast, execObject }: IInterpreterRules<RelationExpression>) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    // @ts-ignore
    if (!RelationalOperatorTokens.includes(rule)) {
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
