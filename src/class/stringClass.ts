import { LiteralType } from '../types/literal';

const TYPE = 'StringLiteral';

type StringLiteralType = LiteralType<string>;

export type StringObjectMethodType = {
  '+': <T extends number>(obj: StringLiteralType, param: any) => any;
  '<': <T extends number>(obj: StringLiteralType, param: any) => any;
  '<=': <T extends number>(obj: StringLiteralType, param: any) => any;
  '>': <T extends number>(obj: StringLiteralType, param: any) => any;
  '>=': <T extends number>(obj: StringLiteralType, param: any) => any;
  '~': <T extends number>(obj: StringLiteralType, param: any) => any;
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
      name: TYPE,
      image: String(obj.image < param.image),
    };
  },
  '<=': (obj, param) => {
    return {
      name: TYPE,
      image: String(obj.image <= param.image),
    };
  },
  '>': (obj, param) => {
    return {
      name: TYPE,
      image: String(obj.image > param.image),
    };
  },
  '>=': (obj, param) => {
    return {
      name: TYPE,
      image: String(obj.image >= param.image),
    };
  },
  '~': (obj, param) => {
    return {
      name: 'NumberLiteralRange',
      start: param.image,
      end: obj.image,
    };
  },
};
