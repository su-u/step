import { BuildInFunctions } from '../buildInFunctions';
import { NullReferenceFunctionError } from '../error';

export class FunctionManager {
  private userFunctions = new Map();
  private readonly buildFunctions: typeof BuildInFunctions;
  constructor() {
    this.buildFunctions = BuildInFunctions;
  }

  public assignment(name: string, functionArguments: any[], programAst: any) {
    this.userFunctions.set(name, {
      arguments: functionArguments,
      function: programAst,
    });
  }

  public reference(name: string) {
    if (this.buildFunctions[name]) {
      return {
        ...this.buildFunctions[name],
        type: 'build',
      };
    } else {
      const func = this.userFunctions.get(name);
      if (func === undefined) {
        throw new NullReferenceFunctionError(`${name}`);
      }
      return {
        ...this.userFunctions.get(name),
        type: 'user',
      };
    }
  }

  public debug() {
    console.group('functions');
    console.info(this.userFunctions);
    console.groupEnd();
  }
}
