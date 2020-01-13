start = program

program = body:mtst?
mtst =  _ head:assign (_body:assign)* _
stmt 
  =  block
  / memberExpression
  / array
  / word
  / lambda
  / arrayLiteral
  / hashLiteral

expression = head: assign tail: assign*
memberExpression = identifier "." member
member = array / (word ":" params)  / word
params = _ identifier (_ "," _ identifier)* (_ identifier ":" _ identifier)*
array = word "[" parameter "]"
parameter = identifier
pipe = _ stmt ( _  "|>" _ stmt )* _
assign = left:pipe (_ "->" _ right:assignTo)* _ ";"
assignTo = array / word / memberExpression
callExpression = left:memberExpression
block = "{" _ mtst _ "}"
lambda = "(" params ")" _ "=>" _ block
arrayLiteral = "[" _ params _ "]"
keyValue = identifier ":" _ identifier
hashLiteral = "{" _ keyValue ( _"," _ keyValue)* _ "}"

_ = [ \t\n\r]*
word = $(char)
char = [a-zA-Z][0-9a-zA-Z]*
number = $([0-9]*)
identifier = array / word / number