import { IInterpreterRules } from './types';
import { functionManager, ScopeManager } from '../manager';
import { LiteralTokens } from "../tokens";

export const factor = ({ ast, scope, interpreter }: IInterpreterRules) => {
  if (ast.children.NumberLiteral !== undefined) {
    const image = parseInt(ast.children.NumberLiteral[0].image);
    return {
      name: LiteralTokens.NumberLiteral,
      image,
    };
  } else if (ast.children.Identifier !== undefined) {
    return scope.reference(ast.children.Identifier[0].image);
  } else if (ast.children.CallFunction !== undefined) {
    const obj = ast.children.CallFunction[0];
    const name = obj.children.FunctionNameToken[0].image;
    const functionData = functionManager.reference(name);
    const scopeManger = new ScopeManager(scope);
    functionData.arguments.forEach((x: any, i: number) => {
      scopeManger.assignment(
        x,
        interpreter(obj.children.arguments[0].children.Factor[i], scope, interpreter),
      );
    });
    return interpreter(functionData.program, scopeManger, interpreter);
  } else if (ast.children.BoolLiteral !== undefined) {
    const image = ast.children.BoolLiteral[0].image;
    return {
      name: LiteralTokens.BooleanLiteral,
      image,
    };
  } else if (ast.children.StringLiteral !== undefined) {
    const image = ast.children.StringLiteral[0].image;
    return {
      name: LiteralTokens.StringLiteral,
      image,
    };
  }
};
