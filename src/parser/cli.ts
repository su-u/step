import { parseInput } from './index';
import * as fs from 'fs-extra';
import { writeAstToJson } from '../util/file';
import { removeObjectByKey, UnnecessaryKeys } from '../util/json';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = par seInput(inputText);
const rAst = removeObjectByKey(ast, UnnecessaryKeys);
writeAstToJson(rAst as any);
