const TYPE = 'NumberLiteral';

export type NumberObjectMethodType = {
  '+': <T extends number>(obj: any, param: any) => any;
  '*': <T extends number>(obj: any, param: any) => any;
  '-': <T extends number>(obj: any, param: any) => any;
  '/': <T extends number>(obj: any, param: any) => any;
  '<': <T extends number>(obj: any, param: any) => any;
  '<=': <T extends number>(obj: any, param: any) => any;
  '>': <T extends number>(obj: any, param: any) => any;
  '>=': <T extends number>(obj: any, param: any) => any;
  to_s: <T extends number>(obj: any, param: any) => string;
};

export const NumberClass: NumberObjectMethodType = {
  '+': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image + param,
    };
  },
  '-': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image - param.image,
    };
  },
  '*': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image * param.image,
    };
  },
  '/': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image / param.image,
    };
  },
  '<': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image < param.image,
    };
  },
  '<=': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image <= param.image,
    };
  },
  '>': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image > param.image,
    };
  },
  '>=': (obj, param) => {
    return {
      name: TYPE,
      image: obj.image >= param.image,
    };
  },
  to_s: (obj, param) => {
    return String(obj.image);
  },
};
