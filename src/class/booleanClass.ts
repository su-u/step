import { LiteralTokens } from '../tokens';
import { BooleanLiteralTokens } from '../tokens';

export type BooleanObjectMethodType = {
  '=': (obj: any, param: any) => any;
  and: (obj: any, param: any) => any;
  or: (obj: any, param: any) => any;
};

export const BooleanClass: BooleanObjectMethodType = {
  '=': (obj, param) => {
    if (
      obj.name === LiteralTokens.NumberLiteralRange &&
      param.name === LiteralTokens.NumberLiteralRange
    ) {
      return {
        name: LiteralTokens.BooleanLiteral,
        image: String(obj.start === param.start && obj.end === param.end),
      };
    }
    if (obj.name === LiteralTokens.ArrayLiteral && param.name === LiteralTokens.ArrayLiteral) {
      if (obj.image.length !== param.image.length) {
        return {
          name: LiteralTokens.BooleanLiteral,
          image: 'false',
        };
      }
      return {
        name: LiteralTokens.BooleanLiteral,
        image: String(
          obj.image.every(
            (x, i) => BooleanClass['='](x, param.image[i]).image === BooleanLiteralTokens.true,
          ),
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
      image: String(obj.image === param.image && obj.image !== undefined),
    };
  },
  and: (obj, param) => {
    const boolObj = toBoolean(obj);
    const boolParam = toBoolean(param);

    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        boolObj.image === BooleanLiteralTokens.true &&
          boolParam.image === BooleanLiteralTokens.true,
      ),
    };
  },
  or: (obj, param) => {
    const boolObj = toBoolean(obj);
    const boolParam = toBoolean(param);

    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        boolObj.image === BooleanLiteralTokens.true ||
          boolParam.image === BooleanLiteralTokens.true,
      ),
    };
  },
};

export const toBoolean = (obj: any) => {
  switch (obj.name) {
    case LiteralTokens.BooleanLiteral:
      return obj;
    case LiteralTokens.NumberLiteral:
      return {
        name: LiteralTokens.BooleanLiteral,
        image: String(obj.image > 0),
      };
    case LiteralTokens.StringLiteral:
      return {
        name: LiteralTokens.BooleanLiteral,
        image: String(obj.image !== ''),
      };
    case LiteralTokens.ArrayLiteral:
      return {
        name: LiteralTokens.BooleanLiteral,
        image: BooleanLiteralTokens.true,
      };
    case LiteralTokens.NumberLiteralRange:
      return {
        name: LiteralTokens.BooleanLiteral,
        image: BooleanLiteralTokens.true,
      };
    default:
      return {
        name: LiteralTokens.DebugLiteral,
        image: null,
      }
  }
};
