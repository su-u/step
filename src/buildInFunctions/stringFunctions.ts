import { AllLiteralType } from '../types/literal';
import { LiteralTokens } from '../tokens';

export const StringBuildInFunctions = [
  [
    'string',
    (obj: AllLiteralType) => {
      return {
        name: LiteralTokens.StringLiteral,
        image: String(obj),
      };
    },
  ],
];
