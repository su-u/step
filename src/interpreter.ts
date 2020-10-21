import { Rules } from './types/rules';
import logger from './logger';
import { term } from './interpriterRules/term';
import { factor } from './interpriterRules/factor';
import { expression } from './interpriterRules/expression';
import { relationExpression } from './interpriterRules/relationExpression';
import { pipe } from './interpriterRules/pipe';
import { assignment } from './interpriterRules/assignment';
import { program } from './interpriterRules/program';
import { blockStatement } from './interpriterRules/blockStatement';
import { parenthesisExpression } from './interpriterRules/parenthesisExpression';
import { returnStatement } from './interpriterRules/returnStatement';
import { functionStatement } from './interpriterRules/functions';

export const interpreter = (ast: any, scope: any = null) => {
  logger.info(ast.name);
  let value = null;
  switch (ast.name) {
    case Rules.Program:
      value = program({ ast, scope, interpreter });
      break;
    case Rules.Assignment:
      value = assignment({ ast, scope, interpreter });
      break;
    case Rules.Pipe:
      value = pipe({ ast, scope, interpreter });
      break;
    case Rules.RelationExpression:
      value = relationExpression({ ast, scope, interpreter });
      break;
    case Rules.Expression:
      value = expression({ ast, scope, interpreter });
      break;
    case Rules.Term:
      value = term({ ast, scope, interpreter });
      break;
    case Rules.Factor:
      value = factor({ ast, scope, interpreter });
      break;
    case Rules.Function:
      value = functionStatement({ ast, scope, interpreter });
      break;
    case Rules.BlockStatement:
      value = blockStatement({ ast, scope, interpreter });
      break;
    case Rules.ParenthesisExpression:
      value = parenthesisExpression({ ast, scope, interpreter });
      break;
    case Rules.ReturnStatement:
      value = returnStatement({ ast, scope, interpreter });
      break;
  }
  if (scope !== null && scope.returnExist) {
    return scope.returnValue;
  } else {
    return value;
  }
};
