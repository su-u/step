import { LiteralTokens } from '../tokens';
import { IFunction } from './type';

export const NumberBuildInFunctions: { [key: string]: IFunction } = {
  int: {
    function: (obj: any[]) => {
      return {
        name: LiteralTokens.NumberLiteral,
        image: parseInt(String(obj[0].image), 10),
      };
    },
    arguments: ['obj'],
  },
  abs: {
    function: (obj: any[]) => {
      if (!Number.isFinite(obj[0].image as any)) throw new Error('数値ではありません。');
      return {
        name: LiteralTokens.NumberLiteral,
        image: Math.abs(obj[0].image as number),
      };
    },
    arguments: ['obj'],
  },
};
