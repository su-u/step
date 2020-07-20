import { StringClassObject } from '@/class/String';
import { ObjectClassObject } from '@/class/Object';
import { ClassEnum, ObjectEnum } from '@/objectEnum';

describe('String Class', (): void => {
  test("クラス名が'String'かどうか", (): void => {
    expect(StringClassObject.className).toBe('String');
  });

  test('superClassの確認', (): void => {
    expect(StringClassObject.superClass).toEqual(ObjectClassObject);
  });

  describe('+', (): void => {
    test('文字列同士の結合', (): void => {
      const obj1: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'test',
        class: ClassEnum.String,
      };
      const obj2: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'タピオカ',
        class: ClassEnum.String,
      };
      const result = StringClassObject['+'](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBe('testタピオカ');
      expect(result.class).toBe(ClassEnum.String);
    });

    test('数値と文字列の結合', (): void => {
      const obj1: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 123,
        class: ClassEnum.Number,
      };
      const obj2: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'タピオカ',
        class: ClassEnum.String,
      };
      const result = StringClassObject['+'](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBe('123タピオカ');
      expect(result.class).toBe(ClassEnum.String);
    });

    test('文字列と数値の結合', (): void => {
      const obj1: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: '123',
        class: ClassEnum.String,
      };
      const obj2: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 567,
        class: ClassEnum.Number,
      };
      const result = StringClassObject['+'](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBe('123567');
      expect(result.class).toBe(ClassEnum.String);
    });

    test('数値同士の結合', (): void => {
      const obj1: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 123,
        class: ClassEnum.Number,
      };
      const obj2: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 567,
        class: ClassEnum.Number,
      };
      const result = StringClassObject['+'](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBe('123567');
      expect(result.class).toBe(ClassEnum.String);
    });
  });
});
