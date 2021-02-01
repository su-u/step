import { sourceParseJson } from '@/util/test';

describe('パイプ', () => {
  test('1', () => {
    const source = `
"test" -> value
value |> console
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
"test" -> value
value |> console |> console
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
