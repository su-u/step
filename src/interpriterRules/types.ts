import { ScopeManager } from '../manager';

export type IInterpreterRules = {
  ast: any;
  scope: ScopeManager;
  interpreter: (ast: any, scope: any, interpreter: any) => any;
};
