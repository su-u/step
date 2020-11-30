import { sourceParseJson } from '@/util/test';

describe('match', () => {
  test('1', () => {
    const source = `
1 |> match (num) {
  (1) => { return 10 }
}
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
{ 1, 10 } |> match (num1, num2) {
  (1, 10) => { return 10 },
  (2, 20) => { return 20 }
}
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
