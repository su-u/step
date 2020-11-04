import { LiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';
import { BooleanLiteralTokens } from '../tokens';

export type BooleanObjectMethodType = {
  '=': (obj: any, param: any) => any;
  and: (obj: any, param: any) => any;
  or: (obj: any, param: any) => any;
};

export const BooleanClass: BooleanObjectMethodType = {
  '=': (obj, param) => {
    if (obj.name === LiteralTokens.NumberLiteralRange && param.name === LiteralTokens.NumberLiteralRange) {
      return {
        name: LiteralTokens.BooleanLiteral,
        image: String(
          obj.start === param.start && obj.end === param.end
        ),
      };
    }
    if (obj.name !== param.name) {
      return {
        name: LiteralTokens.BooleanLiteral,
        image: 'false',
      };
    }
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        obj.image === param.image && obj.image !== undefined,
      ),
    };
  },
  and: (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        obj.image === BooleanLiteralTokens.true && param.image === BooleanLiteralTokens.true,
      ),
    };
  },
  or: (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        obj.image === BooleanLiteralTokens.true || param.image === BooleanLiteralTokens.true,
      ),
    };
  },
};
