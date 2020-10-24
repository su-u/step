import { sourceParseJson } from '@/util/test';

describe('each', () => {
  test('1', () => {
    const source = `
    x |> each {
      1 |> console
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
  test('2', () => {
    const source = `
    1~10 |> each (i) {
      i |> console
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
