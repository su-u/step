import ExtensibleCustomError from 'extensible-custom-error';

export class ChibaLangError extends ExtensibleCustomError {}

export class NullReferenceError extends ChibaLangError {
  constructor(message, ...args) {
    super(`変数が参照できませんでした。${message}`, ...args);
  }
}
