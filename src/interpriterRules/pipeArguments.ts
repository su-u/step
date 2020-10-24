import { IInterpreterRules } from './types';

export const pipeArguments = ({ ast, manager, execObject }: IInterpreterRules) => {
  const args = Object.keys(ast.children).filter((rule) => rule !== 'Comma').map((rule) => {
    return ast.children[rule].map((x) => {
      return execObject.interpreter({ ast: x, manager, execObject });
    });
  });
  return args;
};
