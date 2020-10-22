import { parseInput } from './parser';
import * as fs from 'fs-extra';
import { interpreter } from './interpreter';
import { variableManager, functionManager } from './manager';
import logger from './logger';
import { ScopeManager } from './manager';
logger.level = 'debug';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
const scope = new ScopeManager(variableManager);
interpreter(ast, scope, interpreter);
scope.debug();
functionManager.debug();
