import { LiteralTokens } from '../tokens';
import { TypeError } from '../error';
import { BooleanLiteralTokens } from '../tokens';

type NumberLiteralType = any;

export type NumberObjectMethodType = {
  '+': (obj: NumberLiteralType, param: any) => any;
  '*': (obj: NumberLiteralType, param: any) => any;
  '-': (obj: NumberLiteralType, param: any) => any;
  '/': (obj: NumberLiteralType, param: any) => any;
  '%': (obj: NumberLiteralType, param: any) => any;
  '<': (obj: NumberLiteralType, param: any) => any;
  '<=': (obj: NumberLiteralType, param: any) => any;
  '>': (obj: NumberLiteralType, param: any) => any;
  '>=': (obj: NumberLiteralType, param: any) => any;
  '~': (obj: NumberLiteralType, param: any) => any;
  '=': (obj: NumberLiteralType, param: any) => any;
};

export const NumberClass: NumberObjectMethodType = {
  '+': (param, obj) => {
    const availableType = [LiteralTokens.NumberLiteral, LiteralTokens.StringLiteral] as const;
    if (!availableType.includes(param.name)) {
      throw new TypeError(param.name);
    }
    if (!availableType.includes(obj.name)) {
      throw new TypeError(obj.name);
    }

    if (param.name === LiteralTokens.NumberLiteral && obj.name === LiteralTokens.NumberLiteral) {
      return {
        name: LiteralTokens.NumberLiteral,
        image: obj.image + param.image,
      };
    } else if (
      param.name === LiteralTokens.StringLiteral ||
      obj.name === LiteralTokens.StringLiteral
    ) {
      return {
        name: LiteralTokens.StringLiteral,
        image: String(obj.image + param.image),
      };
    }
  },
  '-': (param, obj) => {
    const availableType = [LiteralTokens.NumberLiteral] as const;
    if (!availableType.includes(param.name)) {
      throw new TypeError(param.name);
    }
    if (!availableType.includes(obj.name)) {
      throw new TypeError(obj.name);
    }

    return {
      name: LiteralTokens.NumberLiteral,
      image: obj.image - param.image,
    };
  },
  '*': (param, obj) => {
    const availableType = [LiteralTokens.NumberLiteral] as const;
    if (!availableType.includes(param.name)) {
      throw new TypeError(param.name);
    }
    if (!availableType.includes(obj.name)) {
      throw new TypeError(obj.name);
    }

    return {
      name: LiteralTokens.NumberLiteral,
      image: obj.image * param.image,
    };
  },
  '/': (param, obj) => {
    const availableType = [LiteralTokens.NumberLiteral] as const;
    if (!availableType.includes(param.name)) {
      throw new TypeError(param.name);
    }
    if (!availableType.includes(obj.name)) {
      throw new TypeError(obj.name);
    }

    return {
      name: LiteralTokens.NumberLiteral,
      image: obj.image / param.image,
    };
  },
  '%': (param, obj) => {
    const availableType = [LiteralTokens.NumberLiteral] as const;
    if (!availableType.includes(param.name)) {
      throw new TypeError(param.name);
    }
    if (!availableType.includes(obj.name)) {
      throw new TypeError(obj.name);
    }

    return {
      name: LiteralTokens.NumberLiteral,
      image: obj.image % param.image,
    };
  },
  '<': (param, obj) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image < param.image),
    };
  },
  '<=': (param, obj) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image <= param.image),
    };
  },
  '>': (param, obj) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image > param.image),
    };
  },
  '>=': (param, obj) => {
    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(obj.image >= param.image),
    };
  },
  '~': (param, obj) => {
    return {
      name: LiteralTokens.NumberLiteralRange,
      start: obj.image,
      end: param.image,
    };
  },
  '=': (param, obj) => {
    if (param.name !== LiteralTokens.NumberLiteral) {
      return {
        name: LiteralTokens.BooleanLiteral,
        image: BooleanLiteralTokens.false,
      };
    }

    return {
      name: LiteralTokens.BooleanLiteral,
      image: String(param.image == obj.image),
    };
  },
};
