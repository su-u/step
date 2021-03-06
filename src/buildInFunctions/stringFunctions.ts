import { LiteralTokens } from '../tokens';
import { IFunction } from './type';

export const StringBuildInFunctions: { [key: string]: IFunction } = {
  string: {
    function: (obj: any[]) => {
      return {
        name: LiteralTokens.StringLiteral,
        image: String(obj[0].image),
      };
    },
    arguments: ['obj'],
  },
};
