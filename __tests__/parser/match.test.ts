import { sourceParseJson } from '@/util/test';

describe('match', () => {
  test('1', () => {
    const source = `
1 |> match {
  (1) => { return 10 }
}
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
{ 1, 10 } |> match {
  (1, 10) => { return 10 },
  () => { return 20 }
}
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
