import { sourceParseJson } from '@/util/test';

describe('変数', () => {
  describe('演算', () => {
    test('数値', () => {
      const source = `
      value <- 1 + 1
      value <- value + 1
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('文字列', () => {
      const source = `
      value <- "test"
      value <- value + "test"
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });
  });

  describe('式', () => {
    test('if', () => {
      const source = `
      value <- 1 + 1
      if (value) {
      } else {
      }
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });
  });
});
