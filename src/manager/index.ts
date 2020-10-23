import { VariableManager } from './variable';
import { functionManager, FunctionManager } from './function';

export type Manager = {
  variable: VariableManager;
  function: FunctionManager;
};

export { functionManager, VariableManager };
