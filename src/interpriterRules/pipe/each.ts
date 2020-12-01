import { IInterpreterRules } from '../types';
import { TypeError } from '../../error';
import { VariableManager } from '../../manager';
import { LiteralTokens } from '../../tokens';

export const execEach = ({ ast, manager, execObject }: IInterpreterRules) => {
  const childrenAst = ast.children.from[0];
  const tail = ast.children.tail[0];
  const value = execObject.interpreter({ ast: childrenAst, manager, execObject });
  // each
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
};
