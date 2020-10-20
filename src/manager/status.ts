export class StatusManager {
  private _returnValue = undefined;
  constructor() {}

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