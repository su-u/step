import { LiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';

export type NumberObjectMethodType = {
  '=': (obj: LiteralType<boolean>, param: any) => any;
};

export const BooleanClass: NumberObjectMethodType = {
  '=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image === param.image),
    };
  },
};
