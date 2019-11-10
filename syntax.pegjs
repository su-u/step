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
		return{
				"type": "AssignmentExpression",
				"operator": "=",
                left,
                right
			}
		}
	/ left:to _"<-"_ right:from _{
		return{
				"type": "AssignmentExpression",
				"operator": "=",
                left,
                right
		}
	}

from
	= value:number{
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
	= [a-zA-z][0-9a-zA-Z]*

number
  = float:$(float) {
  	return parseFloat(float)
  }
  / hexint:$(hexint) {
    return parseInt(hexint)
  }
  / int:$(int) {
    return parseInt(int)
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
