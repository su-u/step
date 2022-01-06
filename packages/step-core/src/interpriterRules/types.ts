import { Manager } from '../manager';

export type IInterpreterRules<T extends { name: string }> = {
  ast: T;
  context: {
    manager: Manager;
    interpreter: ({ ast, context: { interpreter, manager } }) => T;
  };
};
