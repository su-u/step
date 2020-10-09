import { sourceParse } from '@/util/test';

describe('if', () => {
  test('1', () => {
    const source = `
    if (x) {
      x + x
    }
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
  test('2', () => {
    const source = `
    if (x) {
      x + x
    } else {
      x - x
    }
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
  test('3', () => {
    const source = `
    if (x) {
      1 ~ 10 |> each (i) {
        i |> console
      }
    } else {
      x - x
    }
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
});
