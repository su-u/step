import { VariableManager } from './variable';
import { FunctionManager } from './function';

export type Manager = {
  variable: VariableManager;
  function: FunctionManager;
};

export { FunctionManager, VariableManager };
