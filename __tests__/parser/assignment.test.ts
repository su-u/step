import { sourceParseJson } from '@/util/test';

describe('代入', () => {
  describe('右辺', () => {
    test('文字列代入', () => {
      const source = `
      "string" -> value
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('数値代入', () => {
      const source = `
      1 -> value
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('数値演算、代入', () => {
      const source = `
      1 + 1 -> value
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('演算子代入', () => {
      const source = `
      1 ~ 10 -> value
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });
  });
  describe('左辺', () => {
    test('文字列代入', () => {
      const source = `
      val <- "Switch"
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('数値代入', () => {
      const source = `
      aaa <- 1
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('文字列演算代入', () => {
      const source = `
      val <- "str"
      aaa <- val + "aaa"
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('演算子代入', () => {
      const source = `
      v <- 1 ~ 10
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });
  });
});
