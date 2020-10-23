import { AllLiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';

export const NumberBuildInFunctions = [
  [
    'int',
    (obj: AllLiteralType) => {
      return {
        name: LiteralTokens.NumberLiteral,
        image: parseInt(String(obj.image), 10),
      };
    },
  ],
];
