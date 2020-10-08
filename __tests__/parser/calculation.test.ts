import { sourceParse } from '@/util/test';

describe('演算', () => {
  test('1', () => {
    const source = `
    1 + 1 -> value
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
    val <- "Switch"
    aaa <- val + "aaa"
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
});
