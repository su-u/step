import { ObjectClassObject } from '@/class/Object';
import { ObjectEnum, ClassEnum } from '@/old/objectEnum';

describe('Object Class', (): void => {
  test("クラス名が'Object'かどうか", (): void => {
    expect(ObjectClassObject.className).toBe('Object');
  });

  test('superClassの確認', (): void => {
    expect(ObjectClassObject.superClass).toBeNull();
  });

  test('to_s', (): void => {
    const str = ObjectClassObject['to_s']('test string');
    expect(str).toBe('test string');
  });

  describe('=', (): void => {
    test('数値の一致', (): void => {
      const obj1: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 1,
        class: ClassEnum.Number,
      };
      const obj2: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 1,
        class: ClassEnum.Number,
      };
      const result = ObjectClassObject['='](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBeTruthy();
      expect(result.class).toBe(ClassEnum.Boolean);
    });

    test('文字列と数値の一致', (): void => {
      const obj1: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: '1',
        class: ClassEnum.String,
      };
      const obj2: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 1,
        class: ClassEnum.Number,
      };
      const result = ObjectClassObject['='](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBeTruthy();
      expect(result.class).toBe(ClassEnum.Boolean);
    });

    test('文字列の一致', (): void => {
      const obj1: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'レストラン',
        class: ClassEnum.String,
      };
      const obj2: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'レストラン',
        class: ClassEnum.String,
      };
      const result = ObjectClassObject['='](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBeTruthy();
      expect(result.class).toBe(ClassEnum.Boolean);
    });

    test('数値の不一致', (): void => {
      const obj1: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 1,
        class: ClassEnum.Number,
      };
      const obj2: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 5,
        class: ClassEnum.Number,
      };
      const result = ObjectClassObject['='](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBeFalsy();
      expect(result.class).toBe(ClassEnum.Boolean);
    });

    test('文字列の不一致', (): void => {
      const obj1: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'typescript',
        class: ClassEnum.String,
      };
      const obj2: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'javascript',
        class: ClassEnum.String,
      };
      const result = ObjectClassObject['='](obj1, [obj2]);
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBeFalsy();
      expect(result.class).toBe(ClassEnum.Boolean);
    });
  });
});
