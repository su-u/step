import { Manager } from '../manager';

export type IInterpreterRules<T extends { name: string }, K> = {
  ast: T;
  manager: Manager;
  execObject: {
    interpreter: ({ ast, manager, execObject: { interpreter } }) => K;
  };
};
