import * as fs from 'fs-extra';
import { parseInput } from '@/parser';

const parse = (sourceName: string) => {
  const inputText = fs.readFileSync(sourceName, 'utf-8');
  return JSON.stringify(parseInput(inputText), undefined, 2);
};

const sourceParse = (source: string) => {
  return JSON.stringify(parseInput(source), undefined, 2);
}

describe('chevrotain', (): void => {
  const chbList: ReadonlyArray<string> = [
    './chb/example1_3.chb',
    './chb/example1.chb',
    './chb/example2.chb',
    './chb/example3.chb',
    './chb/example4.chb',
    './chb/example5_1.chb',
  ];
  chbList.forEach((chb) => {
    test(chb, (): void => {
      const astJson = parse(chb);
      expect(astJson).toMatchSnapshot();
    });
  });
});

describe('代入', () => {
  test('case 1', () => {
    const source = `
    1 + 1 -> value
    `
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('case 2', () => {
    const source = `
    val <- "Switch"
    aaa <- val + "aaa"
    `
    expect(sourceParse(source)).toMatchSnapshot();
  })
});