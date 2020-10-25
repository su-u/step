import * as fs from 'fs-extra';
import { entry } from './index';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
entry(inputText);
