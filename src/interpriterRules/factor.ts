import { IInterpreterRules } from './types';
import { functionManager, VariableManager } from '../manager';
import { LiteralTokens } from '../tokens';

export const factor = ({ ast, manager, execObject }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    const image = parseInt(ast.children.NumberLiteral[0].image);
    return {
      name: LiteralTokens.NumberLiteral,
      image,
    };
  } else if (ast.children.Identifier !== undefined) {
    return manager.variable.reference(ast.children.Identifier[0].image);
  } else if (ast.children.CallFunction !== undefined) {
    const obj = ast.children.CallFunction[0];
    const name = obj.children.FunctionNameToken[0].image;
    const functionData = functionManager.reference(name);
    const scopeManger = new VariableManager(manager.variable);
    functionData.arguments.forEach((x: any, i: number) => {
      scopeManger.assignment(
        x,
        execObject.interpreter({
          ast: obj.children.arguments[0].children.Factor[i],
          manager: {
            variable: scopeManger,
            function: manager.function,
          },
          execObject,
        }),
      );
    });
    return execObject.interpreter({
      ast: functionData.program,
      manager: {
        variable: scopeManger,
        function: manager.function,
      },
      execObject,
    });
  } else if (ast.children.BoolLiteral !== undefined) {
    const image = ast.children.BoolLiteral[0].image;
    return {
      name: LiteralTokens.BooleanLiteral,
      image,
    };
  } else if (ast.children.StringLiteral !== undefined) {
    const image = ast.children.StringLiteral[0].image.slice(1).slice(0, -1);
    return {
      name: LiteralTokens.StringLiteral,
      image,
    };
  }
  return {
    name: LiteralTokens.DebugLiteral,
    image: null,
  };
};
