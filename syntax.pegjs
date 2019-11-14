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
	= Expression
	/ value:number{
		return{
			"type": "Literal",
			"value": value
		}
	}
    / name:iden{
    	return{
            "type":"Identifier",
            "name":name
        }
    }

to
	= name:iden{
		return{
			"type": "Identifier",
			"name": name
		}
	}

iden
	= word:$(word)

word
	= word:[a-zA-z][0-9a-zA-Z]* {
		return { "type": "Identifier", name: word}
	}

number
  = float:$(float) {
  	return { "type": "Literal", value: parseFloat(float), class: "number" }
  }
  / hexint:$(hexint) {
    return { "type": "Literal", value: parseInt(hexint), class: "number" }
  }
  / int:$(int) {
    return { "type": "Literal", value: parseInt(int), class: "number" }
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

Expression
  = head:Term tail:(_ "+"_ Term)* {
		return buildBinaryExpression(head, tail)
    }

Term
  = head:Factor tail:(_"*"_ Factor)* {
		return buildBinaryExpression(head, tail)
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / number
  / iden
