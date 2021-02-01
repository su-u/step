import { Rules } from './rules';
// import logger from './logger';
import { term } from './interpriterRules/term';
import { factor } from './interpriterRules/factor';
import { expression } from './interpriterRules/expression';
import { relationExpression } from './interpriterRules/relationExpression';
import { pipeExpression } from './interpriterRules/pipeExpression';
import { assignment } from './interpriterRules/assignment';
import { program } from './interpriterRules/program';
import { blockStatement } from './interpriterRules/blockStatement';
import { returnStatement } from './interpriterRules/returnStatement';
import { functionStatement } from './interpriterRules/functions';
import { ifStatement } from './interpriterRules/ifStatement';
import { IInterpreterRules } from './interpriterRules/types';
import { pipeFrom } from './interpriterRules/pipeFrom';
import { pipeArguments } from './interpriterRules/pipeArguments';
import { logicExpression } from './interpriterRules/logicExpression';
import { rangeExpression } from './interpriterRules/rangeExpression';

export const interpreter = ({ ast, manager, execObject }: IInterpreterRules) => {
  // logger.info(ast.name);
  let value = null;
  switch (ast.name) {
    case Rules.Program:
      value = program({ ast, manager, execObject });
      break;
    case Rules.Assignment:
      value = assignment({ ast, manager, execObject });
      break;
    case Rules.IfStatement:
      value = ifStatement({ ast, manager, execObject });
      break;
    case Rules.PipeExpression:
      value = pipeExpression({ ast, manager, execObject });
      break;
    case Rules.PipeFrom:
      value = pipeFrom({ ast, manager, execObject });
      break;
    case Rules.PipeArguments:
      value = pipeArguments({ ast, manager, execObject });
      break;
    case Rules.LogicExpression:
      value = logicExpression({ ast, manager, execObject });
      break;
    case Rules.RelationExpression:
      value = relationExpression({ ast, manager, execObject });
      break;
    case Rules.Expression:
      value = expression({ ast, manager, execObject });
      break;
    case Rules.Term:
      value = term({ ast, manager, execObject });
      break;
    case Rules.RangeExpression:
      value = rangeExpression({ ast, manager, execObject });
      break;
    case Rules.Factor:
      value = factor({ ast, manager, execObject });
      break;
    case Rules.Function:
      value = functionStatement({ ast, manager, execObject });
      break;
    case Rules.BlockStatement:
      value = blockStatement({ ast, manager, execObject });
      break;
    case Rules.ReturnStatement:
      value = returnStatement({ ast, manager, execObject });
      break;
  }

  if (manager.variable.returnExist) {
    return manager.variable.returnValue;
  } else {
    return value;
  }
};
