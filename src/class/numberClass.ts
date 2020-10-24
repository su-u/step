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
    return {
      name: LiteralTokens.NumberLiteral,
      image: param.image + obj.image,
    };
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
      name: 'NumberLiteralRange',
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
