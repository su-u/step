import { sourceParseJson } from '../../src/util/test';

describe('operators', () => {
  test('1', () => {
    const source = `
window.test
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
