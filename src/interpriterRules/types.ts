import { Manager } from '../manager';

export type IInterpreterRules<T extends { name: string }> = {
  ast: T;
  manager: Manager;
  execObject: {
    interpreter: ({ ast, manager, execObject: { interpreter } }) => T;
  };
};
