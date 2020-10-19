import { ObjectEnum as TYPE } from '../objectEnum';

type ClassBaseObjectType = any;
type LiteralType<T> = any;
type ParamsType<T> = any;

export type ObjectMethodType = {
  to_s: (obj: any) => string;
  '=': <T>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<boolean>;
};

export const ObjectClassObject: ClassBaseObjectType & ObjectMethodType = {
  superClass: null,
  className: 'Object',
  to_s: (obj) => String(obj),
  '=': (obj, params) => {
    return {
      type: TYPE.VARIABLE,
      value: obj.value == params[0].value,
      class: 'Boolean',
    };
  },
};
