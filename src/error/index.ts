import ExtensibleCustomError from 'extensible-custom-error';

export class ChibaLangError extends ExtensibleCustomError {
  constructor(message, ...args) {
    super(message, ...args);
  }
}

export class NullReferenceVariableError extends ChibaLangError {
  constructor(message, ...args) {
    super(`変数が参照できませんでした。${message}`, ...args);
  }
}

export class NullReferenceFunctionError extends ChibaLangError {
  constructor(message, ...args) {
    super(`関数が参照できませんでした。${message}`, ...args);
  }
}

export class TypeError extends ChibaLangError {
  constructor(message, ...args) {
    super(`処理するデータ型が異なります。${message}`, ...args);
  }
}

export class OutOfRangeError extends ChibaLangError {
  constructor(message, ...args) {
    super(`配列の範囲を超えています。${message}`, ...args);
  }
}
