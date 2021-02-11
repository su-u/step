import { sourceParseJson } from '@/util/test';

describe('演算', () => {
  test('1', () => {
    const source = `
    (1 + 1) / (1100 * (10 - 11))
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
