import { IInterpreterRules } from './types';
import { VariableManager } from '../manager';
import { LiteralTokens } from '../tokens';

export const pipe = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  const tail = ast.children.tail[0];
  const value = execObject.interpreter({ ast: childrenAst, manager, execObject });
  if (tail.children.PipeToken !== undefined) {
    if (tail.toEach !== undefined) {
      const eachObj = tail.toEach[0];
      const range = Array.from(Array(value.end - value.start + 1).keys(), (x) => x + value.start);
      range.forEach((i) => {
        const inScopeManger = new VariableManager(manager);
        if (eachObj.children.Identifier !== undefined) {
          inScopeManger.assignment(eachObj.children.Identifier[0].image, {
            name: LiteralTokens.NumberLiteral,
            image: i,
          });
        }
        execObject.interpreter({
          ast: eachObj.children.Program[0],
          manager: inScopeManger,
          execObject,
        });
      });
      return;
    } else if (tail.children.toIdentifier !== undefined) {
      const objName = tail.children.toIdentifier[0].image;
      // console.log('p', objName, value);
      const functionData = manager.function.reference(objName);
      const literals = Array.isArray(value) ? value[0] : [value];
      // console.log('m', manager.variable);
      if (functionData.type === 'user') {
        const scopeManger = new VariableManager(manager.variable);
        functionData.arguments.forEach((x: any, i: number) => {
          scopeManger.assignment(x, literals[i]);
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
        const arg = functionData.arguments
          .map((_: any, i: number) => {
            return literals[i];
          })
          .filter((x: any) => x !== undefined);
        return functionData.function(arg);
      }
    }
  }
  return value;
};
