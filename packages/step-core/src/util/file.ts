import * as fs from 'fs-extra';

export const writeAstToJson = (ast: any): void => {
  fs.writeFile('out.json', JSON.stringify(ast, undefined, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('write end');
    }
  });
};
