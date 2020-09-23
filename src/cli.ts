import { parseInput } from './parser';
import * as fs from 'fs-extra';
import { interpreter } from './interpreter';
import logger from './logger';
logger.level = 'debug';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
interpreter(ast);
// console.log(JSON.stringify(ast, undefined, 2));
