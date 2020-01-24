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
  function extractList(list, index) {
    return list.map(function(element) { return element[index]; });
  }
  function buildList(head, foo, index) {
    return [head].concat(extractList(foo, index));
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
  =  _ head:assign tail:(_ assign)* _ {
    return buildList(head, tail, 1);
  }
stmt 
  = block
  / memberExpression
  / array
  / word
  / lambda
  / arrayLiteral
  / hashLiteral
  / identifier

// expression = head: assign tail: assign*
memberExpression = left:identifier "." right:member {
  return {
    type: "MemberExpression",
    object: left,
    property: right
  }
}
member
  = array
  / (word ":" params)
  / word
params 
  = _ identifier (_ "," _ identifier)* (_ identifier ":" _ identifier)*
  / block
array = word "[" parameter "]"
parameter = identifier
pipe
  = _ left:stmt right:( _  "|>" _ stmt )* _ {
    return buildPipelineExpression( left, right );
  }
assign
  = source:pipe dest:(_ "->" _ assignTo)* _ ";" {
    return sallow( dest, source )
    //return source
  }
assignTo = array / word / memberExpression
callExpression = left:memberExpression
block = "{" _ mtst _ "}" 
lambda = "(" params ")" _ "=>" _ block
arrayLiteral = "[" _ params _ "]"
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
