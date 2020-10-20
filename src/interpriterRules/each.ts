import { IInterpreterRules } from './types';
import { interpreter } from '../interpreter';

export const each = ({ ast, scope }: IInterpreterRules) => {
  console.log(scope);
  return {};
};
