import { isTrue } from '../../src/interpriterRules/ifStatement';
import { LiteralTokens, BooleanLiteralTokens } from '../../src/tokens';

describe('If', (): void => {
  describe('isTrue', (): void => {
    test('Boolean', (): void => {
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
        const result = isTrue({
          name: condition.name,
          image: condition.image,
        });
        expect(result).toBe(condition.expect);
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
        const result = isTrue({
          name: condition.name,
          image: condition.image,
        });
        expect(result).toBe(condition.expect);
      });
    });
  });
});
