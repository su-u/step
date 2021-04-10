import { IInterpreterRules } from './types';

export const pipeArguments = ({ ast, execObject }: IInterpreterRules<any>) => {
  if (ast.children.argument === undefined) return [];
  const args = ast.children.argument.map((x) => {
    return {
      name: (x.children.name && x.children.name[0].image) || '',
      value: execObject.interpreter({ ast: x.children.rules[0], execObject }),
    };
  });
  return args;
};
