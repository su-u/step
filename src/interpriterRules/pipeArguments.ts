import { IInterpreterRules } from './types';

export const pipeArguments = ({ ast, manager, execObject }: IInterpreterRules) => {
  const args = Object.keys(ast.children).map((rule) => {
    return ast.children[rule].map((x) => {
      return execObject.interpreter({ ast: x, manager, execObject });
    });
  });
  // console.log('Pa', args);
  return args
};
