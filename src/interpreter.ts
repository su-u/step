import { Rules } from './types/rules';
import logger from './logger';
import { term } from './interpriterRules/term';
import { factor } from './interpriterRules/factor';
import { expression } from './interpriterRules/expression';
import { relationExpression } from './interpriterRules/relationExpression';
import { pipe } from './interpriterRules/pipe';
import { assignment } from "@/interpriterRules/assignment";

export const interpreter = (ast: any) => {
  logger.info(ast.name);
  switch (ast.name) {
    case Rules.Program:
      Object.keys(ast.children).forEach((rule) => {
        for (let line of ast.children[rule]) {
          interpreter(line);
        }
      });
      break;
    case Rules.Assignment:
      return assignment({ ast });
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
  }
};
