{
  function sallow( left, right ) {
    //return right;
    console.log( right );
    return  left.reduce( function(result, element) {
    return {
      "type": "AssignmentExpression",
      "operator": "=",
      left: element[3],
      right: result
    }
    }, right);
  }
  function buildBinaryExpression(head, tail) {
    return tail.reduce(function(result, element) {
      return {
        type: "BinaryExpression",
        operator: element[1],
        left: result,
        right: element[3]
      };
    }, head);
  }
  function buildPipelineExpression(head, tail) {
    return "pipe", tail.reduce(function(result, element) {
      return {
        type: "PipelineExpression",
        operator: element[1],
        left: result,
        right: element[3]
      };
    }, head);
  }
  function buildList(head, params, index) {
    return [head].concat(extractList(params, index));
  }
  function extractList(list, index) {
    return list.map(function(element) { return element[index]; });
  }
  function buildParamsOnlyList(head, params, index) {
    return [head].concat(extractList(params, index));
  }
  function extractKwList(list, index) {
    return list.map(function(element) {
      return {key: element[1], value: element[index]} ;
    });
  }
  function buildKwList(head, kwparams, index) {
    return [head].concat(extractKwList(kwparams, index));
  }
}

start = program

program
  = body:mtst? {
    return {
      "type": "Program",
      body
    }
  }
mtst
//  = comment
  = _ head:assign tail:(_ assign)* _ {
    return buildList(head, tail, 1);
  }


stmt
  = block
  / memberExpression
//  / array
//  / member
  / lambda
  / arrayLiteral
  / identifier
//  / callExpression
  / hashLiteral

// expression = head: assign tail: assign*
memberExpression
  = left:identifier "." right:member {
    return {
      type: "MemberExpression",
      object: left,
      property: right
    }
  }
  / member:member {
    return {
      type: "CallExpression",
      member
    }
  }
member
  = array
  / name:identifier ":" _ args:paramsonly {
  console.log(87,name);
    return {
      "type": "Identifier",
      "name": name,
      "arguments":args
    };
  }
  / left:identifier _ args:kwparam+ {
    return {
      left,
      "KWarguments": args
    };
  }
//  / left:identifier {
//    return {
//      "type": "identifier",
//      "name": left,
//      arguments: []
//    }
//  }
  / word
  / block
paramsonly
  = _ left:identifier right:(_ "," _ identifier)*  {
    return buildParamsOnlyList( left, right, 3 );
  }
params2
  = "(" _ left:identifier right:(_ "," _ identifier)*  _ ")" {
    return buildParamsOnlyList( left, right, 3 );
  }
paramswkw
  = _ left:identifier right:(_ "," _ identifier)* keyword:(_ identifier ":" _ identifier)+ {
    return buildParamsWKwList( left, right, 3 );
  }

callExpression
  = call:member {
  return {
    type: "CallExpression",
    property: call
  }
}
array = word "[" parameter "]"
parameter = identifier
kwparam
  = _ key: identifier ":" _ value: identifier {
    return {
      "key": key,
      "value": value
     }
  }
pipe
  = _ left:stmt right:( _  "|>" _ stmt )* _ {
    return buildPipelineExpression( left, right );
  }
assign
  = source:pipe dest:(_ "->" _ assignTo)* _ ";" {
    return sallow( dest, source )
    //return source
  }
assignTo = array / identifier / memberExpression
block
  = "{" _ mtst:mtst _ "}" {
    return {
      "type": "BlockStatement",
      "body":mtst
    }
  }
lambda
//  = "(" param:paramsonly ")" _ "=>" _ block:block {
  = param:params2 _ "=>" _ block:block {
    return {
      "type": "LambdaExpression",
      block
    };
  }
arrayLiteral
  = "[" _ paramsonly _ "]"
keyValue = identifier ":" _ identifier
hashLiteral = "{" _ keyValue ( _"," _ keyValue)* _ "}"

_ "whitespace"
  = [ \t\n\r]*
word = $(char)
char = [a-zA-Z][0-9a-zA-Z]*
number = $([0-9]*)
identifier
  = array
  / word: word {
    return {
      type: "Identifier",
      name: word
    }
  }
  / value: number {
    return{
      type: "NumericalLiteral",
      value: value
    }
  }

comment
  = "#" (!LineTerminator SourceCharacter)*
  
  LineTerminator
  = [\n\r\u2028\u2029]
  
  SourceCharacter
  = .