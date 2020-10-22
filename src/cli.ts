import { parseInput } from './parser';
import * as fs from 'fs-extra';
import { interpreter } from './interpreter';
import { variableManager, functionManager } from './manager';
import logger from './logger';
import { ScopeManager } from './manager';
import { writeAstToJson } from './util/file';
logger.level = 'debug';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
// AST確認用
writeAstToJson(ast as any);

const scope = new ScopeManager(variableManager);
interpreter(ast, scope, interpreter);
scope.debug();
functionManager.debug();
