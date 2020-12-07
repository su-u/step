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
function myFunc() {
  1 + 1 -> value
}
    `;
    exec(source, manager);
  });

  test('2', () => {
    const source = `
function add(x, y) {
  return x + y
}
    `;
    exec(source, manager);
  });

  test('3', () => {
    const source = `
function func(x, y) {
  1 + 2 -> value
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
function out(str) {
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
function out(str) {
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
function out(str) {
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
function out(arg) {
  100 -> result
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
function out(arg) {
  100 -> result
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
function func(j, str) {
  "" -> v
  if (j > 0) {
    str + "true" -> v
  } else {
    str + "false" -> v
  }
  return v
}

function func2(str) {
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
function out() {
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

  test('11', () => {
    const source = `
function func3(a, b) {
  return a + b
}

function func4(a) {
  return a + 100
}

{ 1, 10 } |> func3 |> func4 -> value2
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 111,
    });
  });

  test('12', () => {
    const source = `
function func1(str) {
  return str + "1"
}

function func2(str) {
  return str + "2"
}

"1" |> func1 |> func2 -> value1
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value1')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: '112',
    });
  });

  test('13', () => {
    const source = `
function func(x) {
  return x + 1
}

1 |> func |> func -> value
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
  });

  test('14', () => {
    const source = `
function add(a, b) {
  return a + b
}

{ { 1, 2 } |> add, { 3, 4 } |> add } |> add -> result1

{ "result: ", { 1, 2 } |> add, (1 + 1) } |> add -> result2
1.5 -> number
number |> int -> result3
2.5 |> int -> result4
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 10,
    });
    expect(resultManager.reference('result2')).toStrictEqual({
      name: LiteralTokens.StringLiteral,
      image: 'result: 3',
    });
    expect(resultManager.reference('result3')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
    expect(resultManager.reference('result4')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 2,
    });
  });

  test('15', () => {
    const source = `
function add(a, b) {
  return a + b + 1
}
    `;
    exec(source, manager);
  });

  test('11', () => {
    const source = `
function func4(a) {
  return a + 100
}

{ 1 } |> func4 |> func4 -> value2
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 201,
    });
  });

  test('12', () => {
    const source = `
{ 1 } |> abs -> value1
{ -1 } |> abs -> value2
55 |> abs -> value3
0 |> abs -> value4
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('value1')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
    expect(resultManager.reference('value2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
    expect(resultManager.reference('value3')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 55,
    });
    expect(resultManager.reference('value4')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 0,
    });
  });

  test('13', () => {
    const source = `
function toInt(num) {
  return num |> int
}

1.5 |> toInt -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('14', () => {
    const source = `
function add(a, b) {
  return a + b
}

function func1(num) {
  return { num, 10 } |> add
}

10 |> func1 -> result
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 20,
    });
  });

  test('15', () => {
    const source = `
function add(a, b) {
  return a + b
}

function func1(num) {
  return { num, 10 } |> add
}

{{ 10, 10 } |> add |> func1, 10 } |> add -> result
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 40,
    });
  });

  test('16', () => {
    const source = `
function add(a, b) {
  return a + b
}

function func1(num) {
  return { num, 10 } |> add
}

{ a: { a: 10, b: 10 } |> add |> func1, b: 10 } |> add -> result
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 40,
    });
  });

  test('17', () => {
    const source = `
function toInt(num) {
  return num |> int
}

{ num: 1.5 } |> toInt -> num
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('num')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 1,
    });
  });

  test('18', () => {
    const source = `
function add(a, b) {
  return a + b
}

{ 0, a: 10, 0, b: 11 } |> add -> result
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('result')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 21,
    });
  });

  test('19', () => {
    console.log = () => {};
    const source = `
3 |> console

function add2(a, b) {
 return a + b
}

{ 1, 2 } |> add2 -> v2
    `;
    const resultManager = exec(source, manager).variable;
    expect(resultManager.reference('v2')).toStrictEqual({
      name: LiteralTokens.NumberLiteral,
      image: 3,
    });
  });
});
