import { ObjectClassObject } from '@/class/Object';
import { ObjectEnum as TYPE } from '@/objectEnum';
import { exec } from '@/exec';
import { globalObject } from '@/global';
import { ClassObjectType } from '@/types';

export type StringObjectMethodType = {
  '+': <T>(obj: LiteralType<T>, params: ParamsType<any>) => LiteralType<string>;
};

export const StringClassObject: ClassBaseObjectType & StringObjectMethodType = {
  superClass: ObjectClassObject,
  className: 'String',
  '+': (obj, params) => {
    if (params[0].class == 'String') {
      return {
        type: TYPE.VARIABLE,
        value: obj.value + params[0].value,
        class: 'String',
      };
    } else {
      // console.log([41, obj, params]);
      const str = exec(
        // @ts-ignore
        params[0],
        globalObject[params[0].class] as ClassObjectType,
        'to_s',
      ) as string;
      return { value: obj.value + str, class: 'String', type: TYPE.VARIABLE };
    }
  },
};
