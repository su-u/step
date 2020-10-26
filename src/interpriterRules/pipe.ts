import { IInterpreterRules } from './types';
import { VariableManager } from '../manager';
import { LiteralTokens } from '../tokens';
import { TypeError } from '../error';

export const pipe = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  const tail = ast.children.tail[0];
  const value = execObject.interpreter({ ast: childrenAst, manager, execObject });
  if (tail.children.PipeToken !== undefined) {
    if (tail.children.toEach !== undefined) {
      if (value.start === undefined) throw new TypeError(value.name);
      const eachObj = tail.children.toEach[0];
      const range = Array.from(Array(value.end - value.start + 1).keys(), (x) => x + value.start);
      range.forEach((i) => {
        const inManger = {
          variable: new VariableManager(manager.variable),
          function: manager.function,
        };
        if (eachObj.children.Identifier !== undefined) {
          inManger.variable.assignment(eachObj.children.Identifier[0].image, {
            name: LiteralTokens.NumberLiteral,
            image: i,
          });
        }
        return execObject.interpreter({
          ast: eachObj.children.Program[0],
          manager: inManger,
          execObject,
        });
      });
      return;
    } else if (tail.children.toIdentifier !== undefined) {
      let last = value;
      Object.values(tail.children.toIdentifier).forEach((x: any, i: number) => {
        const objName = x.image;
        const functionData = manager.function.reference(objName);
        const literals = Array.isArray(last) ? last[0] : [last];
        if (functionData.type === 'user') {
          const scopeManger = new VariableManager(manager.variable);
          functionData.arguments.forEach((x: any, i: number) => {
            scopeManger.assignment(x, literals[i]);
          });
          last = execObject.interpreter({
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
          last = functionData.function(arg);
        }
      });
      return last;
    }
  }
  return value;
};
