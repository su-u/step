import { IInterpreterRules } from './types';
import { Classes } from '../class';
import { VariableManager } from '../manager';
import { RelationalOperatorTokens } from "../operators";

export const pipeArguments = ({ ast, manager, execObject }: IInterpreterRules) => {
  const [literals, operators] = Object.keys(ast.children).map((rule) => {
    if (!RelationalOperatorTokens.includes(rule)) {
      return ast.children[rule].map((x) => {
        return execObject.interpreter({ ast: x, manager, execObject });
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
