import * as fs from 'fs-extra';
import pegjs from 'pegjs';

const astToJson = (fileName: string, ruleset: string): string => {
  const source = fs.readFileSync(fileName, 'utf-8');
  const parser = pegjs.generate(ruleset);
  const ast = parser.parse(source);
  return JSON.stringify(ast, undefined, 2);
};

  describe('ruleset', (): void => {
    let ruleset: string;
    beforeAll(() => {
      ruleset = fs.readFileSync('./syntax.pegjs', 'utf-8');
    });

    test('example11', (): void => {
      const astJson = astToJson('./chb/example1.chb', ruleset);
      expect(astJson).toMatchSnapshot();
    });
    test('example1_2', (): void => {
    const astJson = astToJson('./chb/example1_2.chb', ruleset);
    expect(astJson).toMatchSnapshot();
  });
  test('example2', (): void => {
    const astJson = astToJson('./chb/example2.chb', ruleset);
    expect(astJson).toMatchSnapshot();
  });
  test('example3', (): void => {
    const astJson = astToJson('./chb/example3.chb', ruleset);
    expect(astJson).toMatchSnapshot();
  });
  test('example4', (): void => {
    const astJson = astToJson('./chb/example4.chb', ruleset);
    expect(astJson).toMatchSnapshot();
  });
});
