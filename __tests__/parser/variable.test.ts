import { sourceParseJson } from '@/util/test';

describe('変数', () => {
  describe('演算', () => {
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

  describe('式', () => {
    test('if', () => {
      const source = `
1 + 1 -> value
if: value {
} else {
}
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });
  });
});
