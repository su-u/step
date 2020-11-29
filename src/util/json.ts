import * as _ from 'lodash';

export const toJson = (ast: any) => {
  return JSON.stringify(ast, undefined, 2);
};

export const UnnecessaryKeys: ReadonlyArray<string> = [
  // 'startOffset',
  // 'endOffset',
  // 'startLine',
  // 'endLine',
  // 'startColumn',
  // 'endColumn',
  // 'tokenTypeIdx',
  // 'tokenType',
];

export const removeObjectByKey = (object, removeKeys) => {
  // lodash#cloneDeep
  const _obj = _.cloneDeep(object);

  function _remove(obj) {
    for (let o in obj) {
      if (removeKeys.includes(o)) {
        delete obj[o];
      } else if (typeof obj[o] === 'object') {
        _remove(obj[o]);
      }
    }
  }

  _remove(_obj);
  return _obj;
};
