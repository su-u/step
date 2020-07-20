import * as log4js from 'log4js';
const log4js_extend = require('log4js-extend');

const outFormat = 'at @name (@line:@column)';

log4js_extend(log4js, {
  path: __dirname,
  format: outFormat,
});

const logger = log4js.getLogger('syntax');

export default logger;
