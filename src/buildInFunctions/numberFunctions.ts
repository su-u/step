import { AllLiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';
import { IFunction } from './type';

export const NumberBuildInFunctions: { [key: string]: IFunction } = {
  int: {
    function: (obj: AllLiteralType[]) => {
      return {
        name: LiteralTokens.NumberLiteral,
        image: parseInt(String(obj[0].image), 10),
      };
    },
    arguments: ['obj'],
  },
};
