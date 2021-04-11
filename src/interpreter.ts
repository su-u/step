import { IInterpreterRules } from './interpriterRules/types';
import { Rules } from './rules';
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
import { pipeFrom } from './interpriterRules/pipeFrom';
import { pipeArguments } from './interpriterRules/pipeArguments';
import { logicExpression } from './interpriterRules/logicExpression';
import { rangeExpression } from './interpriterRules/rangeExpression';

export const interpreter = <T extends { name: string }>({
  ast,
  execObject,
}: IInterpreterRules<any>) => {
  let value = null;
  switch (ast.name) {
    case Rules.ProgramRoot:
      value = program({ ast, execObject });
      break;
    case Rules.Assignment:
      value = assignment({ ast, execObject });
      break;
    case Rules.IfStatement:
      value = ifStatement({ ast, execObject });
      break;
    case Rules.PipeExpression:
      value = pipeExpression({ ast, execObject });
      break;
    case Rules.PipeFrom:
      value = pipeFrom({ ast, execObject });
      break;
    case Rules.PipeArguments:
      value = pipeArguments({ ast, execObject });
      break;
    case Rules.LogicExpression:
      value = logicExpression({ ast, execObject });
      break;
    case Rules.RelationExpression:
      value = relationExpression({ ast, execObject });
      break;
    case Rules.Expression:
      value = expression({ ast, execObject });
      break;
    case Rules.Term:
      value = term({ ast, execObject });
      break;
    case Rules.RangeExpression:
      value = rangeExpression({ ast, execObject });
      break;
    case Rules.Factor:
      value = factor({ ast, execObject });
      break;
    case Rules.FunctionStatement:
      value = functionStatement({ ast, execObject });
      break;
    case Rules.BlockStatement:
      value = blockStatement({ ast, execObject });
      break;
    case Rules.ReturnStatement:
      value = returnStatement({ ast, execObject });
      break;
  }

  if (execObject.manager.variable.returnExist) {
    return execObject.manager.variable.returnValue;
  } else {
    return value;
  }
};
