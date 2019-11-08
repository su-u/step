program
	= comp: compstmt{
		return{
			"type":  "Program",
			comp
		}
	}
 
compstmt
	= head:stmt tail:(_ stmt)*{
		return {
			head,
            tail
		}
	}

stmt
	= _ ExpressionStatement:expr _{
		return {
			"ExpressionStatement" : "test",
			"type": "ExpressionStatement",
            ExpressionStatement
		} 
      }
   
_ "whitespace"
	= [ \t\n\r]*
 
expr
	= from:from _"->"_ to:to _{
		return{
				"type": "AssignmentExpression",
				"operator": {
					"left": {
						"type": "identifier",
						"name": to
					},
					"right":  {
						"type": "literal",
                        "value": from
					}
				}
			}
		}
	/ to:to _"<-"_ from:from _{
		return{
				"type": "AssignmentExpression",
				"operator": {
					"left": {
						"type": "identifier",
						"name": to
					},
					"right":  {
						"type": "literal",
                        "value": from
					}
				}
		}
	}

from
	= value:int{
		return{
			"right": "Literal",
			"type": "Literal",
			"value": value
		}
	}
    / name:iden{
    	return{
        	"right":"Identifier",
            "type":"Identifier",
            "name":name
        }
    }

to
	= name:iden{
		return{
			"left": "Identifier",
			"type": "Identifier",
			"name": name
		}
	}

int
    = _"0x"[0-9]+ _{ return parseInt(text(),16); }
	/ _[0-9]+ _{ return parseInt(text(), 10); }


iden
	= aiden:[0-9a-zA-Z]* _{ return aiden.join('') }
