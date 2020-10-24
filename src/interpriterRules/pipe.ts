import { IInterpreterRules } from './types';
import { VariableManager } from '../manager';
import { LiteralTokens } from '../tokens';

export const pipe = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  const tail = ast.children.tail[0];
  const value = execObject.interpreter({ ast: childrenAst, manager, execObject });
  if (tail.children.PipeToken !== undefined) {
    if (tail.children.toEach !== undefined) {
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
      if (tail.children.toIdentifier.length === 1) {
        const objName = tail.children.toIdentifier[0].image;
        const functionData = manager.function.reference(objName);
        const literals = Array.isArray(value) ? value[0] : [value];
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
      } else {
        let last = value;
        Object.values(tail.children.toIdentifier).forEach((x: any, i: number) => {
          // console.log('x', x);
          // console.log('last', last);
          const objName = x.image;
          const functionData = manager.function.reference(objName);
          const literals = Array.isArray(last) ? last[0][0] : last;
          if (functionData.type === 'user') {
            const scopeManger = new VariableManager(manager.variable);
            functionData.arguments.forEach((x: any, i: number) => {
              scopeManger.assignment(x, literals);
            });
            // scopeManger.debug();

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
  }
  return value;
};
