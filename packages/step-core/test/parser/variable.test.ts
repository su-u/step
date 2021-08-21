import { sourceParseJson } from '../../src/util/test';
describe('変数', () => {
  test('数値', () => {
    const source = `
1 + 1 -> value
value + 1 -> value
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('文字列', () => {
    const source = `
"test" -> value
value + "test" -> value
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
