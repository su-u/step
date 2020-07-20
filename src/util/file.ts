import * as fs from 'fs-extra';
import logger from '@/logger';

export const writeAstToJson = (ast: AstType): void => {
  fs.writeFile('out.json', JSON.stringify(ast, undefined, 2), (err) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info('write end');
    }
  });
};
