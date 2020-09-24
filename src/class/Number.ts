import { ObjectClassObject } from '@/class/Object';
import { ObjectEnum as TYPE } from '@/old/objectEnum';

export type NumberObjectMethodType = {
  '+': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<number>;
  '-': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<number>;
  '*': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<number>;
  '/': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<number>;
  '<': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<boolean>;
  '<=': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<boolean>;
  '>': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<boolean>;
  '>=': <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<boolean>;
  to_s: <T extends number>(obj: LiteralType<T>, params: ParamsType<any>) => string;
};

export const NumberClassObject: ClassBaseObjectType & NumberObjectMethodType = {
  superClass: ObjectClassObject,
  className: 'Number',
  '+': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value + params[0].value,
      class: 'Number',
    };
  },
  '-': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value - params[0].value,
      class: 'Number',
    };
  },
  '*': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value * params[0].value,
      class: 'Number',
    };
  },
  '/': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value / params[0].value,
      class: 'Number',
    };
  },
  '<': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value < params[0].value,
      class: 'Boolean',
    };
  },
  '<=': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value <= params[0].value,
      class: 'Boolean',
    };
  },
  '>': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value > params[0].value,
      class: 'Boolean',
    };
  },
  '>=': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value >= params[0].value,
      class: 'Boolean',
    };
  },
  to_s: (obj, params) => {
    return String(obj.value);
  },
};
