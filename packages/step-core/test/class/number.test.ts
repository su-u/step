import { LiteralTokens } from '../../src/tokens';
import { NumberClass } from '../../src/class/numberClass';

const func = (obj1, obj2, method) => {
  return NumberClass[method](obj1, obj2);
};

const TRUE = {
  name: LiteralTokens.BooleanLiteral,
  image: 'true',
};

const FALSE = {
  name: LiteralTokens.BooleanLiteral,
  image: 'false',
};

describe('NumberClass', () => {
  describe('+', () => {
    test('1', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 2,
        },
        '+',
      );
      expect(result).toStrictEqual({
        name: LiteralTokens.NumberLiteral,
        image: 3,
      });
    });

    test('2', () => {
      const result = func(
        {
          name: LiteralTokens.StringLiteral,
          image: '1',
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 2,
        },
        '+',
      );
      expect(result).toStrictEqual({
        name: LiteralTokens.StringLiteral,
        image: '21',
      });
    });

    test('3', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.BooleanLiteral,
            image: 'true',
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: '1',
          },
          '+',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });

    test('4', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          {
            name: LiteralTokens.BooleanLiteral,
            image: 'false',
          },
          '+',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });
  });

  describe('-', () => {
    test('1', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 2,
        },
        '-',
      );
      expect(result).toStrictEqual({
        name: LiteralTokens.NumberLiteral,
        image: 1,
      });
    });

    test('2', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.StringLiteral,
            image: '10',
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '-',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });

    test('3', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.BooleanLiteral,
            image: [
              {
                name: LiteralTokens.StringLiteral,
                image: '10',
              },
            ],
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '-',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });

    test('4', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.NumberLiteralRange,
            start: 0,
            end: 10,
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '-',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });
  });

  describe('*', () => {
    test('1', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 2,
        },
        '*',
      );
      expect(result).toStrictEqual({
        name: LiteralTokens.NumberLiteral,
        image: 2,
      });
    });

    test('2', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.StringLiteral,
            image: '10',
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '*',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });

    test('3', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.BooleanLiteral,
            image: [
              {
                name: LiteralTokens.StringLiteral,
                image: '10',
              },
            ],
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '*',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });

    test('4', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.NumberLiteralRange,
            start: 0,
            end: 10,
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '*',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });
  });

  describe('/', () => {
    test('1', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 5,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 10,
        },
        '/',
      );
      expect(result).toStrictEqual({
        name: LiteralTokens.NumberLiteral,
        image: 2,
      });
    });

    test('2', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.StringLiteral,
            image: '10',
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '/',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });

    test('3', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.BooleanLiteral,
            image: [
              {
                name: LiteralTokens.StringLiteral,
                image: '10',
              },
            ],
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '/',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });

    test('4', () => {
      expect(() => {
        func(
          {
            name: LiteralTokens.NumberLiteralRange,
            start: 0,
            end: 10,
          },
          {
            name: LiteralTokens.NumberLiteral,
            image: 10,
          },
          '/',
        );
      }).toThrowError('処理するデータ型が異なります。');
    });
  });

  describe('=', () => {
    test('1', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        '=',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('2', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 2,
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('3', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 2,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('4', () => {
      const result = func(
        {
          name: LiteralTokens.StringLiteral,
          image: '1',
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });
  });
});
