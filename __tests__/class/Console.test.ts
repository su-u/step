import { ConsoleClassObject } from '@/class/Console';
import { ObjectClassObject } from '@/class/Object';

describe('Console Class', (): void => {
  test("クラス名が'Console'かどうか", (): void => {
    expect(ConsoleClassObject.className).toBe('Console');
  });

  test('superClassの確認', (): void => {
    expect(ConsoleClassObject.superClass).toEqual(ObjectClassObject);
  });

  test('コンソール出力', (): void => {
    const spyLog = jest.spyOn(console, 'log');
    spyLog.mockImplementation((x) => x);
    ConsoleClassObject.default('test', {}, {});
    expect(console.log).toBeCalled();
    expect(spyLog.mock.calls[0][0]).toBe('test');
    spyLog.mockReset();
    spyLog.mockRestore();
  });
});
