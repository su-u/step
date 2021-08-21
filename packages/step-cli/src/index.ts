import { entry } from 'step';
import * as fs from 'fs-extra';

const inputText = fs.readFileSync(process.argv[2], 'utf-8');
entry(inputText);
