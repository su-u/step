import { LiteralTokens } from '../tokens';

type StringLiteralType = any;

export type StringObjectMethodType = {
  '+': (obj: StringLiteralType, param: any) => any;
  '<': (obj: StringLiteralType, param: any) => any;
  '<=': (obj: StringLiteralType, param: any) => any;
  '>': (obj: StringLiteralType, param: any) => any;
  '>=': (obj: StringLiteralType, param: any) => any;
  '=': (obj: StringLiteralType, param: any) => any;
};

export const StringClass: StringObjectMethodType = {
  '+': (obj, param) => {
    return {
      name: LiteralTokens.StringLiteral,
      image: String(param.image + obj.image),
    };
  },
  '<': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image.length < param.image.length),
    };
  },
  '<=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image.length <= param.image.length),
    };
  },
  '>': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image.length > param.image.length),
    };
  },
  '>=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image.length >= param.image.length),
    };
  },
  '=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image === param.image),
    };
  },
};
