import { sourceParse } from '@/util/test';

describe('演算', () => {
  test('加算', () => {
    const source = `
    1 + 1
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('減算', () => {
    const source = `
    1 - 1
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('乗算', () => {
    const source = `
    1 * 1
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
  test('除算', () => {
    const source = `
    1 / 1
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
});
