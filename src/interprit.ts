import { Rules } from './types/rules';
import logger from "./logger";

export const interprit = (ast: any) => {
  logger.info(ast.name);
  switch (ast.name) {
    case Rules.Program:
      Object.keys(ast.children).forEach((rule) => {
        for (let line of ast.children[rule]) {
          interprit(line);
        }
      });
      break;
    case Rules.Main:
      interprit(ast.children.left[0]);
      const op = ast.children.ToRight[0];
      interprit(ast.children.right[0]);
      break;
    case Rules.Main2:
      Object.keys(ast.children).forEach((rule) => {
        logger.info(rule);
        interprit(rule);
      });
      break;
    case Rules.Pipe:
      Object.keys(ast.children).forEach((rule) => {
        for (let line of ast.children[rule]) {
          interprit(line);
        }
      });
      break;
    case Rules.RelationExpression:
      Object.keys(ast.children).forEach((rule) => {
        for (let line of ast.children[rule]) {
          interprit(line);
        }
      });
      break;
    case Rules.Expression:
      Object.keys(ast.children).forEach((rule) => {
        for (let line of ast.children[rule]) {
          if (line.image === undefined) {
            interprit(line);
          } else {
          }
        }
      });
      break;
    case Rules.Term:
      Object.keys(ast.children).forEach((rule) => {
        for (let line of ast.children[rule]) {
          interprit(line);
        }
      });
      break;
    case Rules.Factor:
      Object.keys(ast.children).forEach((rule) => {
        for (let line of ast.children[rule]) {
          logger.info(line.image);
        }
      });
      break;
    case Rules.To:
      logger.info(ast.children.Identifier[0].image);
      break;
  }
};
