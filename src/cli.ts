import { parseInput } from './parser';
import * as fs from 'fs-extra';
import { interpreter } from './interpreter';
import { variableManager, functionManager } from './manager';
import logger from './logger';
logger.level = 'debug';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
interpreter(ast);
// console.log(JSON.stringify(ast, undefined, 2));
variableManager.debug();
functionManager.debug();
