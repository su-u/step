class VariableManager {
  private variables = new Map();
  constructor() {}

  public assignment(toObject: any, value: any) {
    const name = toObject.image;
    this.variables.set(name, value);
  }

  public reference(name: string) {
    return this.variables.get(name);
  }

  public debug() {
    console.group('variables');
    console.log(this.variables);
    console.groupEnd();
  }
}

const variableManager: VariableManager = new VariableManager();
export { variableManager };
