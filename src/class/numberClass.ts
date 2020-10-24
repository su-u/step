import { LiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';

type NumberLiteralType = LiteralType<number>;

export type NumberObjectMethodType = {
  '+': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '*': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '-': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '/': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '<': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '<=': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '>': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '>=': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '~': <T extends number>(obj: NumberLiteralType, param: any) => any;
  '=': <T extends number>(obj: NumberLiteralType, param: any) => any;
  to_s: <T extends number>(obj: NumberLiteralType, param: any) => any;
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
      image: param.image < obj.image,
    };
  },
  '<=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: param.image <= obj.image,
    };
  },
  '>': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: param.image > obj.image,
    };
  },
  '>=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: param.image >= obj.image,
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
      image: obj.image == param.image,
    };
  },
  to_s: (obj, param) => {
    return {
      name: LiteralTokens.StringLiteral,
      image: String(obj.image),
    };
  },
};
