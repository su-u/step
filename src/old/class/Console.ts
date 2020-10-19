import { ObjectClassObject } from '../class/Object';

export type ConsoleObjectMethodType = {
  default: (obj: any, params: any, options: any) => any;
};

export const ConsoleClassObject: ClassBaseObjectType & ConsoleObjectMethodType = {
  superClass: ObjectClassObject,
  className: 'Console',
  default: (obj, params, options) => {
    console.log(obj);
    return obj;
  },
};
