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

  test('1', () => {
    const source = `
1 > 10 -> v
      `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
1 = 1 -> v
      `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('3', () => {
    const source = `
1 = 1 and 1 > 10 -> v
      `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
