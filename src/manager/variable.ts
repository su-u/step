export class VariableManager {
  private _returnValue = undefined;
  private _parent: VariableManager | null;
  private variables = new Map();

  constructor(parent: any) {
    this._parent = parent;
  }

  private parentSetValue(name: string, value: any) {
    if (this.variables.has(name)) {
      this.variables.set(name, value);
      return true;
    } else if (this._parent !== null) {
      return this._parent.parentSetValue(name, value);
    }
    return false;
  }

  public assignment(name: any, value: any) {
    if (this._parent !== null) {
      const result = this._parent.parentSetValue(name, value);
      if (!result) {
        this.variables.set(name, value);
      }
    } else {
      this.variables.set(name, value);
    }
  }

  public reference(name: string) {
    const value =
      this.variables.get(name) || (this._parent !== null && this._parent.reference(name)) || null;
    if (value === null) {
      throw new Error(`変数が参照できませんでした。${name}`);
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
