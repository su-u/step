import { sourceParseJson } from '@/util/test';

describe('関数', () => {
  test('1', () => {
    const source = `
    function myFunc: {
      1 + 1
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
    function add: x, y {
      return x + y
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('3', () => {
    const source = `
    function func: x, y {
      x - y + 1 -> value
      return value
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('4 pipe', () => {
    const source = `
    function out: str {
      str |> console
    }
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('5 pipe', () => {
    const source = `
    function out: str {
      str |> console
    }
    "str" |> out
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('6 pipe', () => {
    const source = `
    function out: str {
      str |> console
    }
    { "str" } |> out
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
