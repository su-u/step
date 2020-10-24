import { AllLiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';
import { IFunction } from './type';

export const ConsoleBuildInFunctions: { [key: string]: IFunction } = {
  console: {
    function: (obj: AllLiteralType[]) => {
      if (Array.isArray(obj)) {
        console.log(...obj.map((x) => x.image));
      } else {
        console.log((obj as any).image);
      }
      return {
        name: LiteralTokens.StringLiteral,
        image: null,
      };
    },
    arguments: ['obj1', 'obj2', 'obj3', 'obj4'],
  },
};
