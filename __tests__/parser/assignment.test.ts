import { sourceParse } from '@/util/test';

describe('代入', () => {
  describe('右辺', () => {
    test('文字列代入', () => {
      const source = `
      "string" -> value
      `;
      expect(sourceParse(source)).toMatchSnapshot();
    });

    test('数値代入', () => {
      const source = `
      1 -> value
      `;
      expect(sourceParse(source)).toMatchSnapshot();
    });

    test('数値演算、代入', () => {
      const source = `
      1 + 1 -> value
      `;
      expect(sourceParse(source)).toMatchSnapshot();
    });
  });
  describe('左辺', () => {
    test('文字列代入', () => {
      const source = `
      val <- "Switch"
      `;
      expect(sourceParse(source)).toMatchSnapshot();
    });
    test('数値代入', () => {
      const source = `
      aaa <- 1
      `;
      expect(sourceParse(source)).toMatchSnapshot();
    });
    test('文字列演算代入', () => {
      const source = `
      val <- "str"
      aaa <- val + "aaa"
      `;
      expect(sourceParse(source)).toMatchSnapshot();
    });
  });
});
