import { LiteralTokens } from '../tokens';
import { IFunction } from './type';

export const ConsoleBuildInFunctions: { [key: string]: IFunction } = {
  console: {
    function: (obj: any[] | any) => {
      if (obj.length >= 2) {
        console.log(...obj.map((x) => x.image));
      } else if (obj[0].name === LiteralTokens.NumberLiteralRange) {
        const range = Array.from(
          Array(obj[0].end - obj[0].start + 1).keys(),
          (x) => x + obj[0].start,
        );
        range.forEach((i) => {
          console.log(i);
        });
      } else if (obj[0].name === LiteralTokens.ArrayLiteral) {
        obj[0].image.map((x) => console.log(x.image));
      } else {
        console.log((obj[0] as any).image);
      }
      return {
        name: LiteralTokens.StringLiteral,
        image: null,
      };
    },
    arguments: ['obj1', 'obj2', 'obj3', 'obj4'],
  },
};
