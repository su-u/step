import { LiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';

type NumberLiteralType = LiteralType<number>;

export type NumberObjectMethodType = {
  '+': (obj: NumberLiteralType, param: any) => any;
  '*': (obj: NumberLiteralType, param: any) => any;
  '-': (obj: NumberLiteralType, param: any) => any;
  '/': (obj: NumberLiteralType, param: any) => any;
  '<': (obj: NumberLiteralType, param: any) => any;
  '<=': (obj: NumberLiteralType, param: any) => any;
  '>': (obj: NumberLiteralType, param: any) => any;
  '>=': (obj: NumberLiteralType, param: any) => any;
  '~': (obj: NumberLiteralType, param: any) => any;
  '=': (obj: NumberLiteralType, param: any) => any;
};

export const NumberClass: NumberObjectMethodType = {
  '+': (obj, param) => {
    if (obj.name === LiteralTokens.NumberLiteral && param.name === LiteralTokens.NumberLiteral) {
      return {
        name: LiteralTokens.NumberLiteral,
        image: param.image + obj.image,
      };
    } else if (obj.name === LiteralTokens.StringLiteral || param.name === LiteralTokens.StringLiteral) {
      return {
        name: LiteralTokens.StringLiteral,
        image: param.image + obj.image,
      };
    }
  },
  '-': (obj, param) => {
    return {
      name: LiteralTokens.NumberLiteral,
      image: param.image - obj.image,
    };
  },
  '*': (obj, param) => {
    return {
      name: LiteralTokens.NumberLiteral,
      image: param.image * obj.image,
    };
  },
  '/': (obj, param) => {
    return {
      name: LiteralTokens.NumberLiteral,
      image: param.image / obj.image,
    };
  },
  '<': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(param.image < obj.image),
    };
  },
  '<=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(param.image <= obj.image),
    };
  },
  '>': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(param.image > obj.image),
    };
  },
  '>=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(param.image >= obj.image),
    };
  },
  '~': (obj, param) => {
    return {
      name: LiteralTokens.NumberLiteralRange,
      start: param.image,
      end: obj.image,
    };
  },
  '=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image == param.image),
    };
  },
};
