import { Manager } from '../manager';

export type IInterpreterRules<T extends { name: string }> = {
  ast: T;
  execObject: {
    manager: Manager;
    interpreter: ({ ast, execObject: { interpreter, manager } }) => T;
  };
};
