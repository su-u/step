class VariableManager {
  private variables = new Map();
  constructor() {

  }

  public assignment(toObject: any, value: any) {
    const name = toObject.image;
    this.variables.set(name, value)
  }
}

const variableManager: VariableManager = new VariableManager();
export { variableManager };
