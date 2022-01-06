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
  context,
}: IInterpreterRules<any>) => {
  let value = null;
  switch (ast.name) {
    case Rules.ProgramRoot:
      value = program({ ast, context: context });
      break;
    case Rules.Assignment:
      value = assignment({ ast, context: context });
      break;
    case Rules.IfStatement:
      value = ifStatement({ ast, context: context });
      break;
    case Rules.PipeExpression:
      value = pipeExpression({ ast, context: context });
      break;
    case Rules.PipeFrom:
      value = pipeFrom({ ast, context: context });
      break;
    case Rules.PipeArguments:
      value = pipeArguments({ ast, context: context });
      break;
    case Rules.LogicExpression:
      value = logicExpression({ ast, context: context });
      break;
    case Rules.RelationExpression:
      value = relationExpression({ ast, context: context });
      break;
    case Rules.Expression:
      value = expression({ ast, context: context });
      break;
    case Rules.Term:
      value = term({ ast, context: context });
      break;
    case Rules.RangeExpression:
      value = rangeExpression({ ast, context: context });
      break;
    case Rules.Factor:
      value = factor({ ast, context: context });
      break;
    case Rules.FunctionStatement:
      value = functionStatement({ ast, context: context });
      break;
    case Rules.BlockStatement:
      value = blockStatement({ ast, context: context });
      break;
    case Rules.ReturnStatement:
      value = returnStatement({ ast, context: context });
      break;
  }

  if (context.manager.variable.returnExist) {
    return context.manager.variable.returnValue;
  } else {
    return value;
  }
};
