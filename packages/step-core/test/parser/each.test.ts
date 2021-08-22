import { sourceParseJson } from '../../src/util/test';

describe('each', () => {
  test('1', () => {
    const source = `
    1~10 |> each (i) {
      i |> console
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
