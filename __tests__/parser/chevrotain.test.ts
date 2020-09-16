import * as fs from "fs-extra";
import { parseInput } from "@/parser";

const parse = (sourceName: string) => {
  const inputText = fs.readFileSync(sourceName, 'utf-8');
  return JSON.stringify(parseInput(inputText), undefined, 2);
}

describe('chevrotain', (): void => {
  test('example1', (): void => {
    const astJson = parse('./chb/example1.chb');
    expect(astJson).toMatchSnapshot();
  });
});