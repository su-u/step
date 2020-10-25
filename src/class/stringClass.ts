import { LiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';

const TYPE = 'StringLiteral';

type StringLiteralType = LiteralType<string>;

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
      name: TYPE,
      image: String(param.image + obj.image),
    };
  },
  '<': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image < param.image),
    };
  },
  '<=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image <= param.image),
    };
  },
  '>': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image > param.image),
    };
  },
  '>=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image >= param.image),
    };
  },
  '=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image === param.image),
    };
  },
};
