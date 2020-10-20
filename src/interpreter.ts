import { Rules } from './types/rules';
import logger from './logger';
import { term } from './interpriterRules/term';
import { factor } from './interpriterRules/factor';
import { expression } from './interpriterRules/expression';
import { relationExpression } from './interpriterRules/relationExpression';
import { pipe } from './interpriterRules/pipe';
import { assignment } from './interpriterRules/assignment';
import { program } from './interpriterRules/program';
import { each } from './interpriterRules/each';
import { blockStatement } from './interpriterRules/blockStatement';
import { parenthesisExpression } from './interpriterRules/parenthesisExpression';
import { returnStatement } from './interpriterRules/returnStatement';
import { functionStatement } from './interpriterRules/functions';

export const interpreter = (ast: any, status: any = null) => {
  logger.info(ast.name);
  let value = null;
  switch (ast.name) {
    case Rules.Program:
      value = program({ ast, status });
      break;
    case Rules.Assignment:
      value = assignment({ ast });
      break;
    case Rules.Each:
      value = each({ ast });
      break;
    case Rules.Pipe:
      value = pipe({ ast });
      break;
    case Rules.RelationExpression:
      value = relationExpression({ ast });
      break;
    case Rules.Expression:
      value = expression({ ast });
      break;
    case Rules.Term:
      value = term({ ast });
      break;
    case Rules.Factor:
      value = factor({ ast });
      break;
    case Rules.Function:
      value = functionStatement({ ast });
      break;
    case Rules.BlockStatement:
      value = blockStatement({ ast });
      break;
    case Rules.ParenthesisExpression:
      value = parenthesisExpression({ ast });
      break;
    case Rules.ReturnStatement:
      value = returnStatement({ ast, status });
      break;
  }
  if (status !== null && status.returnExist) {
    return status.returnValue;
  } else {
    return value;
  }
};
