import { NumberClassObject } from '@/class/Number';
import { ObjectClassObject } from '@/class/Object';
import { ObjectEnum, ClassEnum } from '@/objectEnum';

const toNumberLiteralType = (value: number): LiteralType<number> => {
  return {
    type: ObjectEnum.LITERAL,
    value,
    class: ClassEnum.Number,
  };
};

describe('Number Class', (): void => {
  test('superClassが正しいかどうか', (): void => {
    expect(NumberClassObject.superClass).toEqual(ObjectClassObject);
  });

  test("クラス名が'Number'かどうか", (): void => {
    expect(NumberClassObject.className).toBe('Number');
  });

  test('NumberLiteralType + NumberLiteralType', (): void => {
    const obj1 = toNumberLiteralType(1);
    const obj2 = toNumberLiteralType(5);
    const ans = NumberClassObject['+'](obj1, [obj2]);
    expect(ans.type).toBe(ObjectEnum.VARIABLE);
    expect(ans.value).toBe(6);
    expect(ans.class).toBe(ClassEnum.Number);
  });

  test('NumberLiteralType - NumberLiteralType', (): void => {
    const obj1 = toNumberLiteralType(10);
    const obj2 = toNumberLiteralType(5);
    const ans = NumberClassObject['-'](obj1, [obj2]);
    expect(ans.type).toBe(ObjectEnum.VARIABLE);
    expect(ans.value).toBe(5);
    expect(ans.class).toBe(ClassEnum.Number);
  });

  test('NumberLiteralType * NumberLiteralType', (): void => {
    const obj1 = toNumberLiteralType(2);
    const obj2 = toNumberLiteralType(8);
    const ans = NumberClassObject['*'](obj1, [obj2]);
    expect(ans.type).toBe(ObjectEnum.VARIABLE);
    expect(ans.value).toBe(16);
    expect(ans.class).toBe(ClassEnum.Number);
  });

  describe('NumberLiteralType / NumberLiteralType', (): void => {
    test('通常', (): void => {
      const obj1 = toNumberLiteralType(10);
      const obj2 = toNumberLiteralType(2);
      const ans = NumberClassObject['/'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBe(5);
      expect(ans.class).toBe(ClassEnum.Number);
    });

    test('割り切れない', (): void => {
      const obj1 = toNumberLiteralType(10);
      const obj2 = toNumberLiteralType(3);
      const ans = NumberClassObject['/'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBe(10 / 3);
      expect(ans.class).toBe(ClassEnum.Number);
    });
  });

  describe('NumberLiteralType < NumberLiteralType', (): void => {
    test('通常1', (): void => {
      const obj1 = toNumberLiteralType(10);
      const obj2 = toNumberLiteralType(3);
      const ans = NumberClassObject['<'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('通常2', (): void => {
      const obj1 = toNumberLiteralType(10);
      const obj2 = toNumberLiteralType(50);
      const ans = NumberClassObject['<'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界1', (): void => {
      const obj1 = toNumberLiteralType(10);
      const obj2 = toNumberLiteralType(10);
      const ans = NumberClassObject['<'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界2', (): void => {
      const obj1 = toNumberLiteralType(10);
      const obj2 = toNumberLiteralType(10.1);
      const ans = NumberClassObject['<'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界3', (): void => {
      const obj1 = toNumberLiteralType(10.3);
      const obj2 = toNumberLiteralType(10.2);
      const ans = NumberClassObject['<'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });
  });

  describe('NumberLiteralType <= NumberLiteralType', (): void => {
    test('通常1', (): void => {
      const obj1 = toNumberLiteralType(2);
      const obj2 = toNumberLiteralType(2);
      const ans = NumberClassObject['<='](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('通常2', (): void => {
      const obj1 = toNumberLiteralType(4);
      const obj2 = toNumberLiteralType(5);
      const ans = NumberClassObject['<='](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('通常3', (): void => {
      const obj1 = toNumberLiteralType(10);
      const obj2 = toNumberLiteralType(5);
      const ans = NumberClassObject['<='](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界1', (): void => {
      const obj1 = toNumberLiteralType(2.2);
      const obj2 = toNumberLiteralType(2.2);
      const ans = NumberClassObject['<='](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界2', (): void => {
      const obj1 = toNumberLiteralType(2.2);
      const obj2 = toNumberLiteralType(2.1);
      const ans = NumberClassObject['<='](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });
  });

  describe('NumberLiteralType > NumberLiteralType', (): void => {
    test('通常1', (): void => {
      const obj1 = toNumberLiteralType(5);
      const obj2 = toNumberLiteralType(4);
      const ans = NumberClassObject['>'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('通常2', (): void => {
      const obj1 = toNumberLiteralType(5);
      const obj2 = toNumberLiteralType(50);
      const ans = NumberClassObject['>'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界1', (): void => {
      const obj1 = toNumberLiteralType(20);
      const obj2 = toNumberLiteralType(20);
      const ans = NumberClassObject['>'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界2', (): void => {
      const obj1 = toNumberLiteralType(2.01);
      const obj2 = toNumberLiteralType(2);
      const ans = NumberClassObject['>'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });
  });

  describe('NumberLiteralType >= NumberLiteralType', (): void => {
    test('通常1', (): void => {
      const obj1 = toNumberLiteralType(5);
      const obj2 = toNumberLiteralType(4);
      const ans = NumberClassObject['>='](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('通常2', (): void => {
      const obj1 = toNumberLiteralType(5);
      const obj2 = toNumberLiteralType(8);
      const ans = NumberClassObject['>'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界1', (): void => {
      const obj1 = toNumberLiteralType(9);
      const obj2 = toNumberLiteralType(9);
      const ans = NumberClassObject['>'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeFalsy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });

    test('境界2', (): void => {
      const obj1 = toNumberLiteralType(9.1);
      const obj2 = toNumberLiteralType(9);
      const ans = NumberClassObject['>'](obj1, [obj2]);
      expect(ans.type).toBe(ObjectEnum.VARIABLE);
      expect(ans.value).toBeTruthy();
      expect(ans.class).toBe(ClassEnum.Boolean);
    });
  });

  test('to_s', (): void => {
    const obj = toNumberLiteralType(5);
    const ans = NumberClassObject['to_s'](obj, []);
    expect(ans).toBe('5');
  });
});
