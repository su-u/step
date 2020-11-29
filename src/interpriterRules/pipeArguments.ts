import { IInterpreterRules } from './types';

export const pipeArguments = ({ ast, manager, execObject }: IInterpreterRules) => {
  if (ast.children.argument === undefined) return [];
  const args = ast.children.argument.map((x) => {
    return {
      name: (x.children.name && x.children.name[0].image) || '',
      value: execObject.interpreter({ ast: x.children.Pipe[0], manager, execObject }),
    };
  });
  return args;
};
