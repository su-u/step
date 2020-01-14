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
}

start = program

program
  = body:mtst? {
    return {
      "type": "Program",
      body
    }
  }
mtst =  _ head:assign (_body:assign)* _
stmt 
  = block
  / memberExpression
  / array
  / word
  / lambda
  / arrayLiteral
  / hashLiteral

// expression = head: assign tail: assign*
memberExpression = identifier "." member
member = array / (word ":" params)  / word
params = _ identifier (_ "," _ identifier)* (_ identifier ":" _ identifier)*
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
identifier = array / word / number
