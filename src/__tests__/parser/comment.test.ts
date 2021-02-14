import { sourceParseJson } from '../../util/test';

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
