import { LiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';
import { BooleanLiteralTokens } from '../tokens';

export type BooleanObjectMethodType = {
  '=': (obj: LiteralType<string>, param: any) => any;
  and: (obj: LiteralType<string>, param: any) => any;
  or: (obj: LiteralType<string>, param: any) => any;
};

export const BooleanClass: BooleanObjectMethodType = {
  '=': (obj, param) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(
        obj.image === param.image && obj.name === param.name && obj.image !== undefined,
      ),
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
