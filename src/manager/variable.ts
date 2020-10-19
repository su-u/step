class VariableManager {
  private variables = new Map();
  constructor() {

  }

  public assignment(toObject: any, value: any) {
    const name = toObject.image;
    this.variables.set(name, value)
  }

  public debug() {
    console.group('variables');
    this.variables.forEach((x) => {
      console.log(x);
    });
    console.groupEnd();
  }
}

const variableManager: VariableManager = new VariableManager();
export { variableManager };
