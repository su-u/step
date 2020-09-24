import { NumberClassObject } from '@/class/Number';
import { exec } from '@/old/exec';
import { ClassEnum, ObjectEnum } from '@/old/objectEnum';
import { StringClassObject } from '@/class/String';

describe('exec test', (): void => {
  describe('Number Class', (): void => {
    test('メソッドの実行', (): void => {
      const obj1: LiteralType<number> = {
        type: ObjectEnum.LITERAL,
        value: 2,
        class: ClassEnum.Number,
      };
      const str = exec(obj1, NumberClassObject, 'to_s');
      expect(str).toBe('2');
    });
  });

  describe('String Class', (): void => {
    test('メソッドの実行', (): void => {
      const obj1: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'aaa',
        class: ClassEnum.String,
      };
      const obj2: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: 'aaa',
        class: ClassEnum.String,
      };
      const result = exec(obj1, StringClassObject, '=', [obj2]) as LiteralType<boolean>;
      expect(result.type).toBe(ObjectEnum.VARIABLE);
      expect(result.value).toBeTruthy();
      expect(result.class).toBe(ClassEnum.Boolean);
    });

    test('メソッドエラー', (): void => {
      const obj1: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: '555',
        class: ClassEnum.String,
      };
      const obj2: LiteralType<string> = {
        type: ObjectEnum.LITERAL,
        value: '555',
        class: ClassEnum.String,
      };
      expect(() => {
        exec(obj1, StringClassObject, '-', [obj2]);
      }).toThrow();
    });
  });
});
