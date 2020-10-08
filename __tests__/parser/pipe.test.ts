import { sourceParse } from '@/util/test';

describe('パイプ', () => {
  test('1', () => {
    const source = `
    1 |> console
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
    1 + 1 |> console
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('3', () => {
    const source = `
    value <- "test"
    value |> console
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });

  test('4', () => {
    const source = `
    value <- "test"
    value |> console |> console
    `;
    expect(sourceParse(source)).toMatchSnapshot();
  });
});
