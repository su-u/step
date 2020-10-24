import { IInterpreterRules } from './types';
import { Classes } from '../class';
import { VariableManager } from '../manager';

export const pipe = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  const value = execObject.interpreter({ ast: childrenAst, manager, execObject });
  if (ast.children.PipeToken !== undefined) {
    if (ast.children.toEach !== undefined) {
      const eachObj = ast.children.toEach[0];
      const range = Array.from(Array(value.end - value.start + 1).keys(), (x) => x + value.start);
      range.forEach((i) => {
        const inScopeManger = new VariableManager(manager);
        if (eachObj.children.Identifier !== undefined) {
          inScopeManger.assignment(eachObj.children.Identifier[0].image, {
            name: 'NumberLiteral',
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
    } else if (ast.children.toIdentifier !== undefined) {
      const objName = ast.children.toIdentifier[0].image;
      // console.log('p', objName, value);
      const functionData = manager.function.reference(objName);
      // console.log(functionData);
      if (functionData.type === 'user') {
        const scopeManger = new VariableManager(manager.variable);
        functionData.arguments.forEach((x: any, i: number) => {
          scopeManger.assignment(
            x,
            value[0][i]
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
          return value[0][i]
        }).filter((x: any) => x !== undefined);
        // console.log('a', arg);
        return functionData.function(arg);
        }
    }
  }
  return value;
};
