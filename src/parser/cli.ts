import { parseInput } from "./index";
import * as fs from 'fs-extra';
import { writeAstToJson } from '../util/file';


const inputText = fs.readFileSync(process.argv[2], 'utf-8');
const ast = parseInput(inputText);
console.log(JSON.stringify(ast, undefined, 2));
writeAstToJson(ast as any);
