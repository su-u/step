export class VariableManager {
  private variables = new Map();
  constructor() {}

  public assignment(name: any, value: any) {
    this.variables.set(name, value);
  }

  public reference(name: string) {
    return this.variables.get(name);
  }

  public get parent() {
    return this;
  }

  public debug() {
    console.group('variables');
    console.log(this.variables);
    console.groupEnd();
  }
}

const variableManager: VariableManager = new VariableManager();
export { variableManager };
