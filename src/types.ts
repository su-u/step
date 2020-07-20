import { ObjectMethodType } from '@/class/Object';
import { StringObjectMethodType } from '@/class/String';
import { NumberObjectMethodType } from '@/class/Number';
import { ConsoleObjectMethodType } from '@/class/Console';

export type ClassObjectType =
  | (ClassBaseObjectType & ObjectMethodType)
  | (ClassBaseObjectType & NumberObjectMethodType)
  | (ClassBaseObjectType & StringObjectMethodType)
  | (ClassBaseObjectType & ConsoleObjectMethodType);

export type MethodType =
  | keyof ObjectMethodType
  | keyof StringObjectMethodType
  | keyof NumberObjectMethodType
  | keyof ConsoleObjectMethodType;

export type GlobalObjectType =
  | (ClassBaseObjectType & ObjectMethodType)
  | (ClassBaseObjectType & NumberObjectMethodType)
  | (ClassBaseObjectType & StringObjectMethodType)
  | (ClassBaseObjectType & ConsoleObjectMethodType)
  | AllLiteralType
  | IdentifierType
  | BinaryExpressionType;
