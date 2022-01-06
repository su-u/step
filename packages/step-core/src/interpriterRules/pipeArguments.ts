import { IInterpreterRules } from './types';

export const pipeArguments = ({ ast, context }: IInterpreterRules<any>) => {
  if (ast.children.argument === undefined) return [];
  const args = ast.children.argument.map((x) => {
    return {
      name: (x.children.name && x.children.name[0].image) || '',
      value: context.interpreter({ ast: x.children.rules[0], context }),
    };
  });
  return args;
};
