import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';
import { functionManager } from '../manager';

export const functionStatement = ({ ast }: IInterpreterRules) => {
  const functionName = ast.children.FunctionNameToken[0].image;
  functionManager.assignment(functionName, [], {});
};
