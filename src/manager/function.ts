class FunctionManager {
  private functions = new Map();
  constructor() {}

  public assignment(name: any, functionArguments: any[], programAst: any) {
    this.functions.set(name, {
      arguments: functionArguments,
      program: programAst,
    });
  }

  public reference(name: string) {
    return this.functions.get(name);
  }

  public debug() {
    console.group('functions');
    console.log(this.functions);
    console.groupEnd();
  }
}

const functionManager: FunctionManager = new FunctionManager();
export { functionManager };
