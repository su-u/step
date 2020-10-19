import { Rules } from './types/rules';
import logger from './logger';
import { term } from './interpriterRules/term';
import { factor } from './interpriterRules/factor';
import { expression } from './interpriterRules/expression';
import { relationExpression } from './interpriterRules/relationExpression';
import { pipe } from './interpriterRules/pipe';
import { assignment } from './interpriterRules/assignment';
import { program } from "./interpriterRules/program";
import { each } from "@/interpriterRules/each";
import { blockStatement } from "@/interpriterRules/blockStatement";
import { parenthesisExpression } from "@/interpriterRules/parenthesisExpression";
import { returnStatement } from "@/interpriterRules/returnStatement";
import { functionStatement } from "@/interpriterRules/functions";

export const interpreter = (ast: any) => {
  logger.info(ast.name);
  switch (ast.name) {
    case Rules.Program:
      return program({ast});
    case Rules.Assignment:
      return assignment({ ast });
    case Rules.Each:
      return each({ ast });
    case Rules.Pipe:
      return pipe({ ast });
    case Rules.RelationExpression:
      return relationExpression({ ast });
    case Rules.Expression:
      return expression({ ast });
    case Rules.Term:
      return term({ ast });
    case Rules.Factor:
      return factor({ ast });
    case Rules.To:
      logger.info(ast.children.Identifier[0].image);
      return ast.children.Identifier[0].image;
    case Rules.Function:
      return functionStatement({ ast });
    case Rules.BlockStatement:
      return blockStatement({ ast });
    case Rules.ParenthesisExpression:
      return parenthesisExpression({ ast });
    case Rules.ReturnStatement:
      return returnStatement({ ast });
  }
};
