import { BuildInFunctions } from '../buildInFunctions';

export class FunctionManager {
  private userFunctions = new Map();
  private readonly buildFunctions: any;
  constructor() {
    this.buildFunctions = BuildInFunctions;
  }

  public assignment(name: any, functionArguments: any[], programAst: any) {
    this.userFunctions.set(name, {
      arguments: functionArguments,
      function: programAst,
    });
  }

  public reference(name: string) {
    if (this.buildFunctions[name] !== undefined) {
      return {
        ...this.buildFunctions[name],
        type: 'build',
      };
    } else {
      return {
        ...this.userFunctions.get(name),
        type: 'user',
      };
    }
  }

  public debug() {
    console.group('functions');
    console.log(this.userFunctions);
    console.groupEnd();
  }
}
