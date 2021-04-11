import { NullReferenceVariableError, OutOfRangeError } from '../error';

export class VariableManager {
  private _returnValue = undefined;
  private readonly _parent: VariableManager | null;
  private variables = new Map<string, any>();

  constructor(parent: VariableManager = null) {
    this._parent = parent;
  }

  private parentSetValue(name: string, value: any, index: number = null) {
    if (this.variables.has(name)) {
      this.assignment(name, value, index);
      return true;
    } else if (this._parent !== null) {
      return this._parent.parentSetValue(name, value, index);
    }
    return false;
  }

  public assignment(name: string, value: any, index: number = null) {
    if (index !== null) {
      return this.setArrayElementVariable(name, value, index);
    } else {
      return this.setVariable(name, value);
    }
  }

  private setArrayElementVariable(name: string, value: any, index: number) {
    if (this._parent !== null) {
      const result = this._parent.parentSetValue(name, value, index);
      if (!result && this.variables.has(name)) {
        const array = this.variables.get(name);
        array.image[index] = value;
        this.variables.set(name, {
          ...array,
        });
      }
    } else {
      const array = this.variables.get(name);
      array.image[index] = value;
      this.variables.set(name, {
        ...array,
      });
    }
  }

  private setVariable(name: string, value: any) {
    if (this._parent !== null) {
      const result = this._parent.parentSetValue(name, value);
      if (!result) {
        this.variables.set(name, value);
      }
    } else {
      this.variables.set(name, value);
    }
  }

  public reference(name: string, index: number = null) {
    if (index !== null) {
      return this.getArrayElementVariable(name, index);
    } else {
      return this.getVariable(name);
    }
  }

  private getArrayElementVariable(name: string, index: number) {
    if (this.variables.has(name)) {
      const value = this.variables.get(name);
      if (index >= value.image.length) throw new OutOfRangeError(`${name}`);
      return this.variables.get(name).image[index];
    }
    const value = (this._parent !== null && this._parent.reference(name, index)) || null;
    if (value === null) {
      throw new NullReferenceVariableError(`${name}`, name);
    }
    return value;
  }

  private getVariable(name: string) {
    if (this.variables.has(name)) {
      return this.variables.get(name);
    }
    const value = (this._parent !== null && this._parent.reference(name)) || null;
    if (value === null) {
      throw new NullReferenceVariableError(`${name}`, name);
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
    console.dir(this.variables, { depth: null });
    console.groupEnd();
  }
}
