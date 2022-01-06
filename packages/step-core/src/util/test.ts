import { parseInput } from '../parser';
import { Manager } from '../manager';
import { interpreter } from '../interpreter';

export const sourceParseJson = (source: string) => {
  return JSON.stringify(parseInput(source), undefined, 2);
};

export const exec = (text: string, manager: Manager) => {
  const ast = parseInput(text);
  interpreter({ ast, context: { manager, interpreter } });
  return manager;
};
