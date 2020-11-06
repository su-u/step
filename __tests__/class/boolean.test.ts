import { LiteralTokens } from '@/tokens';
import { BooleanClass, toBoolean } from '@/class/booleanClass';
import { BooleanLiteralTokens } from "@/tokens";
import { isTrue } from "@/interpriterRules/ifStatement";

const func = (obj1, obj2, method) => {
  return BooleanClass[method](obj1, obj2);
};

const TRUE = {
  name: LiteralTokens.BooleanLiteral,
  image: 'true',
};

const FALSE = {
  name: LiteralTokens.BooleanLiteral,
  image: 'false',
};

describe('BooleanClass', () => {
  describe('=', () => {
    test('1', () => {
      const result = func(
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        '=',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('2', () => {
      const result = func(
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'false',
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('3', () => {
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

    test('4', () => {
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

    test('5', () => {
      const result = func(
        {
          name: LiteralTokens.StringLiteral,
          image: '1',
        },
        {
          name: LiteralTokens.StringLiteral,
          image: '1',
        },
        '=',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('6', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
        },
        {
          name: LiteralTokens.StringLiteral,
          image: '1',
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('7', () => {
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

    test('8', () => {
      const result = func(
        {
          name: LiteralTokens.StringLiteral,
          image: 'true',
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('9', () => {
      const result = func(
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'false',
        },
        {
          name: LiteralTokens.StringLiteral,
          image: 'false',
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('10', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 0,
          end: 10,
        },
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 0,
          end: 10,
        },
        '=',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('11', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 1,
          end: 10,
        },
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 0,
          end: 10,
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('12', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 1,
          end: 10,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 10,
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('13', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteral,
          image: 10,
        },
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 1,
          end: 10,
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('14', () => {
      const result = func(
        {
          name: LiteralTokens.StringLiteral,
          image: '1~10',
        },
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 1,
          end: 10,
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('15', () => {
      const result = func(
        {
          name: LiteralTokens.NumberLiteralRange,
          start: 1,
          end: 11,
        },
        {
          name: LiteralTokens.StringLiteral,
          image: '1~10',
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('16', () => {
      const result = func(
        {
          name: LiteralTokens.ArrayLiteral,
          image: [
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
          ],
        },
        {
          name: LiteralTokens.ArrayLiteral,
          image: [
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
          ],
        },
        '=',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('17', () => {
      const result = func(
        {
          name: LiteralTokens.ArrayLiteral,
          image: [
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
          ],
        },
        {
          name: LiteralTokens.ArrayLiteral,
          image: [
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
            {
              name: LiteralTokens.BooleanLiteral,
              image: 'false',
            },
          ],
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });

    test('18', () => {
      const result = func(
        {
          name: LiteralTokens.ArrayLiteral,
          image: [
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
            {
              name: LiteralTokens.StringLiteral,
              image: 'false',
            },
          ],
        },
        {
          name: LiteralTokens.StringLiteral,
          image: 'false',
        },
        '=',
      );
      expect(result).toStrictEqual(FALSE);
    });
  });

  describe('or', () => {
    test('1', () => {
      const result = func(
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        'or',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('2', () => {
      const result = func(
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'false',
        },
        'or',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('3', () => {
      const result = func(
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'false',
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        'or',
      );
      expect(result).toStrictEqual(TRUE);
    });

    test('3', () => {
      const result = func(
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'false',
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: 'true',
        },
        'or',
      );
      expect(result).toStrictEqual(TRUE);
    });
  });

  describe('toBoolean', () => {
    test('1', () => {
      const conditions = [
        {
          name: LiteralTokens.BooleanLiteral,
          image: BooleanLiteralTokens.true,
          expect: true,
        },
        {
          name: LiteralTokens.BooleanLiteral,
          image: BooleanLiteralTokens.false,
          expect: false,
        },
      ];
      conditions.forEach((condition: any) => {
        const result = toBoolean({
          name: condition.name,
          image: condition.image,
        });
        expect(result.image).toBe(String(condition.expect));
      });
    });

    test('Number', (): void => {
      const conditions = [
        {
          name: LiteralTokens.NumberLiteral,
          image: 0,
          expect: false,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 1,
          expect: true,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 0.1,
          expect: true,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 0.0001,
          expect: true,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: 100,
          expect: true,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: -1,
          expect: false,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: -0.1,
          expect: false,
        },
        {
          name: LiteralTokens.NumberLiteral,
          image: -100,
          expect: false,
        },
      ];
      conditions.forEach((condition: any) => {
        const result = toBoolean({
          name: condition.name,
          image: condition.image,
        });
        expect(result.image).toBe(String(condition.expect));
      });
    });
  });
});
