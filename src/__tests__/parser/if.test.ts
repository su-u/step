import { sourceParseJson } from '../../util/test';

describe('if', () => {
  test('1', () => {
    const source = `
    if (x and y) {
      1 ~ 10 |> each (i) {
        i |> console
      }
    } else {
      x - x
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
