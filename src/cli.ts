import * as fs from 'fs-extra';
import logger from './logger';
import { entry } from "./index";
logger.level = 'debug';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
entry(inputText);