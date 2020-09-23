import * as lodash from 'lodash';

import { ObjectClassObject } from '@/class/Object';
import { NumberClassObject } from '@/class/Number';
import { StringClassObject } from '@/class/String';
import { GlobalObjectType } from '@/types';

export const defaultGlobalObject: { [key: string]: GlobalObjectType } = {
  Object: ObjectClassObject,
  Number: NumberClassObject,
  String: StringClassObject,
} as const;

export let globalObject: { [key: string]: GlobalObjectType } = {
  Object: ObjectClassObject,
  Number: NumberClassObject,
  String: StringClassObject,
};

export const globalObjectInit = () => {
  globalObject = lodash.cloneDeep(defaultGlobalObject);
};
