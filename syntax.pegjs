{function sallow( left, right ) {
	return {
		"type": "AssignmentExpression",
		"operator": "=",
		left,
		right
	}
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
}
program
	= body: compstmt{
		return{
			"type":  "Program",
			body
		}
	}

compstmt
	= stmt:stmt*

stmt
	= _ expression:expr _{
		return {
			"type": "ExpressionStatement",
            expression
		}
      }

_ "whitespace"
	= [ \t\n\r]*

expr
	= right:from _"->"_ left:to _{
		return sallow( left, right );
	}
	/ left:to _"<-"_ right:from _{
		return sallow( left, right );
	}

from
	= RelationExpression
	/ value:number{
		return{
			"type": "Literal",
			"value": value
		}
	}
    / name:iden{
    	return name
    }

to
	= name:iden{
		return name
	}

iden
	= word:$(word) {
		return { "type": "Identifier", name: word}
	}

word
	= word:[a-zA-z][0-9a-zA-Z]*

number
  = float:$(float) {
  	return { "type": "Literal", value: parseFloat(float), class: "Number" }
  }
  / hexint:$(hexint) {
    return { "type": "Literal", value: parseInt(hexint), class: "Number" }
  }
  / int:$(int) {
    return { "type": "Literal", value: parseInt(int), class: "Number" }
  }

float
  = int frac digits

int
  = signe? digit19 digits
  / signe digit
  / digit

hexint
  = signe? "0x" hexdigits

digit19 = [1-9]
digit = [0-9]
digits = digit+
hexdigits = [0-9a-f]+

signe
  = "+"
  / "-"
frac = "."

RelationExpression
  = head:Expression tail:(_ RelationalOperator _ Expression)*　{
      　　return buildBinaryExpression( head, tail);
     }

Expression
  = head:Term tail:(_ [+-] _ Term)* {
		return buildBinaryExpression(head, tail)
    }

Term
  = head:Factor tail:(_ [*/] _ Factor)* {
		return buildBinaryExpression(head, tail)
    }

Factor
  = "(" _ expr:RelationExpression _ ")" { return expr; }
  / number
  / iden
  / String


String
  = '"' chars:DoubleQuoteCharacter* '"' {
    return { type: "Literal", value: chars.join(""), class: "String" };
  }

DoubleQuoteCharacter
  = !'"' SourceCharacter { return text(); }

SourceCharacter = .

RelationalOperator
  = "<="
  / ">="
  / "<"
  / ">"
  / "="