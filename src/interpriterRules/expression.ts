import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const expression = ({ ast }: IInterpreterRules) => {
  const result = Object.keys(ast.children).map((rule) => {
    if (ast.children[rule][0].image === undefined) {
      return ast.children[rule].map((x) => {
        return interpreter(x)[0];
      })
    } else {
      return ast.children[rule].map((x) => x.image);
    }
  });
  const afterCalculation = result[0].reduce((a, c, i) => {
    return result[1][i - 1] === '+' ? a + c : a - c;
  })
  return {
    name: 'NumberLiteral',
    image: afterCalculation,
  };
};
