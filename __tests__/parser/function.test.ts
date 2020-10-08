import { sourceParse } from '@/util/test';

describe('関数', () => {
  test('1', () => {
    const source = `
    function myFunc() {
      1 + 1
    }
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
    function add(x, y) {
      return x + y
    }
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('3', () => {
    const source = `
    function func(x, y) {
      value <- x - y + 1
      return value
    }
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('4 pipe', () => {
    const source = `
    function out(str) {
      str |> console
    }
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
});
