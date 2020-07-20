import { ClassEnum, ObjectEnum } from '@/objectEnum';
import { binaryExec } from '@/exec';
import { globalObject, globalObjectInit } from '@/global';

describe('binaryExec test', (): void => {
  beforeEach(() => {
    globalObjectInit();
  });

  test('StringLiteral + StringLiteral', (): void => {
    const obj1: LiteralType<string> = {
      type: ObjectEnum.LITERAL,
      value: '123',
      class: ClassEnum.String,
    };
    const obj2: LiteralType<string> = {
      type: ObjectEnum.LITERAL,
      value: '456',
      class: ClassEnum.String,
    };
    const result = binaryExec(obj1, '+', obj2) as LiteralType<string>;
    expect(result.type).toBe(ObjectEnum.VARIABLE);
    expect(result.value).toBe('123456');
    expect(result.class).toBe(ClassEnum.String);
  });

  test('StringLiteral + NumberLiteral', (): void => {
    const obj1: LiteralType<string> = {
      type: ObjectEnum.LITERAL,
      value: '123',
      class: ClassEnum.String,
    };
    const obj2: LiteralType<number> = {
      type: ObjectEnum.LITERAL,
      value: 888,
      class: ClassEnum.Number,
    };
    const result = binaryExec(obj1, '+', obj2) as LiteralType<string>;
    expect(result.type).toBe(ObjectEnum.VARIABLE);
    expect(result.value).toBe('123888');
    expect(result.class).toBe(ClassEnum.String);
  });

  test('NumberLiteral * NumberLiteral', (): void => {
    const obj1: LiteralType<number> = {
      type: ObjectEnum.LITERAL,
      value: 5,
      class: ClassEnum.Number,
    };
    const obj2: LiteralType<number> = {
      type: ObjectEnum.LITERAL,
      value: 10,
      class: ClassEnum.Number,
    };
    const result = binaryExec(obj1, '*', obj2) as LiteralType<number>;
    expect(result.type).toBe(ObjectEnum.VARIABLE);
    expect(result.value).toBe(50);
    expect(result.class).toBe(ClassEnum.Number);
  });

  test('Identifier + NumberLiteral', (): void => {
    const obj1: LiteralType<number> = {
      type: ObjectEnum.LITERAL,
      value: 5,
      class: ClassEnum.Number,
    };
    globalObject['val'] = obj1;
    const left: IdentifierType = {
      type: ObjectEnum.IDENTIFIER,
      name: 'val',
    };
    const right: LiteralType<number> = {
      type: ObjectEnum.LITERAL,
      value: 5,
      class: ClassEnum.Number,
    };
    const obj2: BinaryExpressionType = {
      type: ObjectEnum.BINARY_EXPRESSION,
      left,
      operator: '+',
      right,
    };
    const result = binaryExec(obj1, '+', obj2) as LiteralType<number>;
    expect(result.type).toBe(ObjectEnum.VARIABLE);
    expect(result.value).toBe(15);
    expect(result.class).toBe(ClassEnum.Number);
    expect(globalObject['val'].type).toBe(ObjectEnum.LITERAL);
    expect(globalObject['val'].value).toBe(5);
    expect(globalObject['val'].class).toBe(ClassEnum.Number);
  });

  test('StringLiteral + Identifier', (): void => {
    const obj1: LiteralType<string> = {
      type: ObjectEnum.LITERAL,
      value: 'Switch',
      class: ClassEnum.String,
    };
    globalObject['ioo'] = obj1;
    const left: IdentifierType = {
      type: ObjectEnum.IDENTIFIER,
      name: 'ioo',
    };
    const right: LiteralType<number> = {
      type: ObjectEnum.LITERAL,
      value: 5,
      class: ClassEnum.Number,
    };
    const obj2: BinaryExpressionType = {
      type: ObjectEnum.BINARY_EXPRESSION,
      left,
      operator: '+',
      right,
    };
    const result = binaryExec(obj1, '+', obj2) as LiteralType<string>;
    expect(result.type).toBe(ObjectEnum.VARIABLE);
    expect(result.value).toBe('SwitchSwitch5');
    expect(result.class).toBe(ClassEnum.String);
  });

  test('StringLiteral + StringLiteral + StringLiteral', (): void => {
    const left: IdentifierType = {
      type: ObjectEnum.IDENTIFIER,
      name: 'kkk',
    };
    const right: LiteralType<string> = {
      type: ObjectEnum.LITERAL,
      value: 'nnn',
      class: ClassEnum.String,
    };
    const obj1: BinaryExpressionType = {
      type: ObjectEnum.BINARY_EXPRESSION,
      left,
      operator: '+',
      right,
    };
    const obj2: LiteralType<string> = {
      type: ObjectEnum.LITERAL,
      value: 'Apex',
      class: ClassEnum.String,
    };
    globalObject['kkk'] = obj2;
    const result = binaryExec(obj1, '+', obj2) as LiteralType<string>;
    expect(result.type).toBe(ObjectEnum.VARIABLE);
    expect(result.value).toBe('ApexnnnApex');
    expect(result.class).toBe(ClassEnum.String);
  });
});
