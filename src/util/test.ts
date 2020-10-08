import { parseInput } from '@/parser';

export const sourceParse = (source: string) => {
  return JSON.stringify(parseInput(source), undefined, 2);
};
