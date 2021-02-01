import { IInterpreterRules } from '../types';
import { TypeError } from '../../error';
import { VariableManager } from '../../manager';
import { LiteralTokens } from '../../tokens';

export const execEach = ({ ast, manager, execObject }: IInterpreterRules, last) => {
  if (last.name === LiteralTokens.NumberLiteralRange) {
    const eachObj = ast.toEach[0];
    const range = Array.from(Array(last.end - last.start + 1).keys(), (x) => x + last.start);
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
    return {
      name: LiteralTokens.NumberLiteral,
      image: range.length,
    };
  } else if (last.name === LiteralTokens.ArrayLiteral) {
    const eachObj = ast.toEach[0];
    last.image.forEach((element) => {
      const inManger = {
        variable: new VariableManager(manager.variable),
        function: manager.function,
      };
      if (eachObj.children.Identifier !== undefined) {
        inManger.variable.assignment(eachObj.children.Identifier[0].image, element);
      }
      return execObject.interpreter({
        ast: eachObj.children.Program[0],
        manager: inManger,
        execObject,
      });
    });
  } else {
    throw new TypeError(last.name);
  }
  return {
    name: LiteralTokens.DebugLiteral,
    image: null,
  };
};
