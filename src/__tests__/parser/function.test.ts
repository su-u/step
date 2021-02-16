import { sourceParseJson } from '../../util/test';

describe('関数', () => {
  test('1', () => {
    const source = `
    function out(str) {
      str |> console
    }
    "str" |> out
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
    function out(str) {
      str |> console
    }
    { "str" } |> out
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
