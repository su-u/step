import { sourceParseJson } from '../../src/util/test';

describe('コメント', () => {
  test('1', () => {
    const source = `
# コメント
## コメント
### コメント #
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
