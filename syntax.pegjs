program
	= comp: compstmt{
		return{
			"type":  "Program",
			comp
		}
	}

compstmt
	= expr: expr{
		return {
			"ExpressionStatement" : "test",
			"type": "ExpressionStatement"
		}
	}

expr
	= from:from "->" to:to{
		return{
			"ExpressionStatement": {
				"type": "AssignmentExpression",
				"operator": {
					"left": {
						"type": "identifier",
						"name": to
					},
					"right":  {
						"type": "literal"
					}
				}
			}
		}
	}
	/ to:to "<-" from:from{
		return{
			"expression": "AssigmentExpression",
			"operator":"<-"
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

to
	= name:iden{
		return{
			"left": "Identifier",
			"type": "Identifier",
			"name": name
		}
	}

int
	= [0-9]*

iden
	= [a-z]*
