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
	= value:int{
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

int
    = _"0x"[0-9]+ _{ return parseInt(text(),16); }
	/ _[0-9]+ _{ return parseInt(text(), 10); }


iden
	= aiden:[0-9a-zA-Z]* _{ return aiden.join('') }
