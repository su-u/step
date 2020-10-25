import { Manager } from '../manager';

export type IInterpreterRules = {
  ast: any;
  manager: Manager;
  execObject: {
    interpreter: ({ ast, manager, execObject: { interpreter } }) => any;
  };
};
