import * as fs from 'fs-extra';
import { parseInput } from '@/parser';

const parse = (sourceName: string) => {
  const inputText = fs.readFileSync(sourceName, 'utf-8');
  return JSON.stringify(parseInput(inputText), undefined, 2);
};

describe('chevrotain', (): void => {
  const chbList: ReadonlyArray<string> = ['./chb/example1.chb', './chb/example2.chb'];
  chbList.forEach((chb) => {
    test(chb, (): void => {
      const astJson = parse(chb);
      expect(astJson).toMatchSnapshot();
    });
  });
});
