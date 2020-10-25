import { LiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';
import { BooleanLiteralTokens } from '../tokens';

export type NumberObjectMethodType = {
  '=': (obj: LiteralType<boolean>, param: any) => any;
  and: (obj: LiteralType<boolean>, param: any) => any;
  or: (obj: LiteralType<boolean>, param: any) => any;
};

export const BooleanClass: NumberObjectMethodType = {
  '=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image === param.image),
    };
  },
  and: (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        // @ts-ignore
        obj.image === BooleanLiteralTokens.true && param.image === BooleanLiteralTokens.true,
      ),
    };
  },
  or: (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        // @ts-ignore
        obj.image === BooleanLiteralTokens.true || param.image === BooleanLiteralTokens.true,
      ),
    };
  },
};
