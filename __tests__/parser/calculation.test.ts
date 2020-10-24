import { sourceParseJson } from '@/util/test';

describe('演算', () => {
  test('加算', () => {
    const source = `
    1 + 1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('減算', () => {
    const source = `
    1 - 1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('乗算', () => {
    const source = `
    1 * 1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('除算', () => {
    const source = `
    1 / 1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  describe('複雑', () => {
    test('1', () => {
      const source = `
      1 + 1 + 1 + 1
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('2', () => {
      const source = `
      (1 + 1) * 3
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('3', () => {
      const source = `
      (1 + 1) / (1100 * 50)
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });

    test('4', () => {
      const source = `
      (1 + 1) / (1100 * (10 - 11))
      `;
      expect(sourceParseJson(source)).toMatchSnapshot();
    });
  });
});
