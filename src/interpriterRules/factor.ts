import { IInterpreterRules } from './types';
import { VariableManager } from '../manager';
import { LiteralTokens } from '../tokens';

export const factor = ({ ast, manager, execObject }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    const image = Number(ast.children.NumberLiteral[0].image);
    return {
      name: LiteralTokens.NumberLiteral,
      image,
    };
  } else if (ast.children.Identifier !== undefined) {
    return manager.variable.reference(ast.children.Identifier[0].image);
  } else if (ast.children.CallFunction !== undefined) {
    const obj = ast.children.CallFunction[0];
    const name = obj.children.FunctionNameToken[0].image.slice(0, -1);
    const functionData = manager.function.reference(name);
    if (functionData.type === 'user') {
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
        ast: functionData.function,
        manager: {
          variable: scopeManger,
          function: manager.function,
        },
        execObject,
      });
    } else {
      const arg = functionData.arguments.map((_: any, i: number) => {
        return execObject.interpreter({
            ast: obj.children.arguments[0].children.Factor[i],
            manager,
            execObject,
          });
      });
      return functionData.function(arg);
    }
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
