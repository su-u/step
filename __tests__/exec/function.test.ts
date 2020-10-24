import { exec } from '@/util/test';
import { VariableManager } from '@/manager';
import { FunctionManager } from '@/manager';
import { LiteralTokens } from '@/tokens';

describe('関数', () => {
  let manager = null;
  beforeEach(() => {
    manager = {
      variable: new VariableManager(null),
      function: new FunctionManager(),
    };
  });
  test('1', () => {
    const source = `
function myFunc: {
  value <- 1 + 1
}
    `;
    exec(source, manager);
  });

  test('2', () => {
    const source = `
function add: x, y {
  return x + y
}
    `;
    exec(source, manager);
  });

  test('3', () => {
    const source = `
function func: x, y {
  value <- 1 + 2
  return value
}
{ 1, 2 } |> func -> result
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
  });

  test('4', () => {
    const source = `
function out: str {
  return str
}
"testword" |> out -> re
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'testword',
    });
  });

  test('5', () => {
    const source = `
function out: str {
  return str + "gg"
}
"testword" |> out -> re
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'testwordgg',
    });
  });

  test('6', () => {
    const source = `
function out: str {
  return str + "ggg"
}
{ "testword" } |> out -> re
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'testwordggg',
    });
  });

  test('7', () => {
    const source = `
function out: arg {
  result <- 100
  if (arg = 0) {
    arg -> result
  } else {
    10 -> result
  }
  return result
}
{ 1 } |> out -> re1
{ 0 } |> out -> re2
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
    expect(resultManager.reference('re2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
  });

  test('8', () => {
    const source = `
function out: arg {
  result <- 100
  if (arg = 0) {
    arg + 1000 -> result
  } else {
    arg * 100 -> result
  }
  return result
}
{ 1 } |> out -> re1
{ 0 } |> out -> re2
-1 |> out -> re3
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('re1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 100,
    });
    expect(resultManager.reference('re2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1000,
    });
    expect(resultManager.reference('re3')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: -100,
    });
  });

  test('9', () => {
    const source = `
function func: j, str {
  v <- ""
  if (j > 0) {
    v <- str + "true"
  } else {
    v <- str + "false"
  }
  return v
}

function func2: str {
  return str + "x"
}

{ 0, "number1" } |> func -> value1
{ 1, "number2" } |> func -> value2
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value1')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'number1false',
    });
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'number2true',
    });
  });

  test('10', () => {
    const source = `
function out: {
  return "return"
}
{} |> out -> result
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'return',
    });
  });


































});
