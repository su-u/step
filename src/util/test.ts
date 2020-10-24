import { parseInput } from '@/parser';

export const sourceParseJson = (source: string) => {
  return JSON.stringify(parseInput(source), undefined, 2);
};
