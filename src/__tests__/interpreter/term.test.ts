import { term } from '../../interpriterRules/term';

describe('Term', (): void => {
  test('ast', (): void => {
    const ast = {
      name: 'Term',
      children: {
        Factor: [
          {
            name: 'Factor',
            children: {
              NumberLiteral: [
                {
                  image: '10',
                  startOffset: 0,
                  endOffset: 1,
                  startLine: 1,
                  endLine: 1,
                  startColumn: 1,
                  endColumn: 2,
                  tokenTypeIdx: 4,
                  tokenType: {
                    name: 'NumberLiteral',
                    PATTERN: {},
                    tokenTypeIdx: 4,
                    CATEGORIES: [],
                    categoryMatches: [],
                    categoryMatchesMap: {},
                    isParent: false,
                  },
                },
              ],
            },
          },
        ],
      },
    };

    // jest.mock('interpreter', () => {
    //   return 1;
    // });
    // const spyLog = jest.spyOn(term, 'interpreter');
    // const result = term({ ast });
    // expect(result).toBe(1);
  });
});
