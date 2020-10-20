import { VariableManager } from './variable';

export class ScopeManager extends VariableManager {
  private _returnValue = undefined;
  constructor() {
    super();
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
}
