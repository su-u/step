import logger from '@/logger';
logger.level = 'debug';
import { readAst } from '@/old/ast';
import { writeAstToJson } from '@/util/file';
import { syntax } from '@/old/syntax';

if (process.argv.length == 0) {
  logger.info('Chiboのソースコードを指定してください');
  process.exit(1);
}

logger.info('Ruleset = syntax.pegjs');
logger.info('source code = ' + process.argv[2]);

const ast: AstType = readAst('syntax.pegjs', process.argv[2]);

writeAstToJson(ast);

syntax(ast);
