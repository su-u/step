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
    return this.variables.get(name) || this._parent.reference(name);
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
