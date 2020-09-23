import { parseInput } from './parser';
import * as fs from 'fs-extra';
import { interprit } from './interprit';
import logger from "./logger";
logger.level = 'debug';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
interprit(ast);
// console.log(JSON.stringify(ast, undefined, 2));
