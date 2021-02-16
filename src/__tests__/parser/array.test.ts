import { sourceParseJson } from '../../util/test';

describe('if', () => {
  test('1', () => {
    const source = `
[0, 1] -> array1
[2, 3] -> array2

0 -> index0
1 -> index1
[array1, array2] -> array3
array[index0] -> a0
array[index1] -> a1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
