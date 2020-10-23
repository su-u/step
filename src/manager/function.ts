export class FunctionManager {
  private functions = new Map();
  constructor() {}

  public assignment(name: any, functionArguments: any[], programAst: any) {
    this.functions.set(name.slice(0, -1), {
      arguments: functionArguments,
      program: programAst,
    });
  }

  public reference(name: string) {
    return this.functions.get(name.slice(0, -1));
  }

  public debug() {
    console.group('functions');
    console.log(this.functions);
    console.groupEnd();
  }
}
