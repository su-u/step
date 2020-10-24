export class VariableManager {
  private _returnValue = undefined;
  private _parent: VariableManager | null;
  private variables = new Map();

  constructor(parent: any) {
    this._parent = parent;
  }

  public assignment(name: any, value: any) {
    this.variables.set(name, value);
  }

  public reference(name: string) {
    const value =
      this.variables.get(name) || (this._parent !== null && this._parent.reference(name)) || null;
    if (value === null) {
      throw new Error('変数が参照できませんでした。');
    }
    return value;
  }

  public set returnValue(value: any) {
    this._returnValue = value;
  }

  public get returnValue() {
    return this._returnValue;
  }

  public get returnExist() {
    return this._returnValue !== undefined;
  }

  public debug() {
    console.group('variables');
    console.log(this.variables);
    console.groupEnd();
  }
}
