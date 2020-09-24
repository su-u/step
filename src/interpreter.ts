import { Rules } from './types/rules';
import logger from './logger';
import { term } from './interpriterRules/term';
import { factor } from './interpriterRules/factor';
import { expression } from './interpriterRules/expression';
import { relationExpression } from './interpriterRules/relationExpression';
import { pipe } from './interpriterRules/pipe';

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
    case Rules.Main:
      interpreter(ast.children.left[0]);
      const op = ast.children.ToRight[0];
      interpreter(ast.children.right[0]);
      break;
    case Rules.Main2:
      Object.keys(ast.children).forEach((rule) => {
        logger.info(rule);
        interpreter(rule);
      });
      break;
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
