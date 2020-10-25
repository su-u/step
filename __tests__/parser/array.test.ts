import { sourceParseJson } from '@/util/test';

describe('if', () => {
  test('1', () => {
    const source = `
[1, 2, 3] -> array
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('2', () => {
    const source = `
1 -> v1
[v1, 2, 3] -> array
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('3', () => {
    const source = `
[0, 1, 2, 3, 4] -> array
array[0] -> a0
array[1] -> a1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('4', () => {
    const source = `
["string1", "string2", 2, 3, 4] -> array
array[0] -> a0
array[1] -> a1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });

  test('5', () => {
    const source = `
[0, 1] -> array1
[2, 3] -> array2

[array1, array2] -> array3
array[0] -> a0
array[1] -> a1
    `;
    expect(sourceParseJson(source)).toMatchSnapshot();
  });
});
