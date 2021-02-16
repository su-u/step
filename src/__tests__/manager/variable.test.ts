import { VariableManager } from '../../manager';

describe('VariableManager', () => {
  test('1', () => {
    const variableManager: VariableManager = new VariableManager(null);
  });

  test('2', () => {
    const variableManager: VariableManager = new VariableManager(null);
    variableManager.assignment('value1', 'test');
    variableManager.assignment('value2', 'test2');

    expect(variableManager.reference('value1')).toEqual('test');
    expect(variableManager.reference('value2')).toEqual('test2');
  });

  test('3', () => {
    const variableManager: VariableManager = new VariableManager(null);
    variableManager.assignment('value1', 'test');
    variableManager.assignment('value2', 'test2');
    variableManager.assignment('value1', 'test3');

    expect(variableManager.reference('value1')).toEqual('test3');
    expect(variableManager.reference('value2')).toEqual('test2');
  });

  test('4', () => {
    const variableManager: VariableManager = new VariableManager(null);
    variableManager.assignment('value1', 'test');
    variableManager.assignment('value2', 'test2');

    const variableManager2: VariableManager = new VariableManager(variableManager);
    variableManager2.assignment('value3', 'test3');
    variableManager2.assignment('value2', 'test4');

    expect(variableManager.reference('value1')).toEqual('test');
    expect(variableManager.reference('value2')).toEqual('test4');
    expect(variableManager2.reference('value3')).toEqual('test3');
    expect(variableManager2.reference('value1')).toEqual('test');
    expect(variableManager2.reference('value2')).toEqual('test4');
    expect(() => {
      variableManager.reference('value3');
    }).toThrowError();
  });
});
