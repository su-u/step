const pegjs = require('pegjs');
const fs = require('fs');

const ruleset = fs.readFileSync("syntax.pegjs", "utf-8");

if( process.argv.length == 0 ) {
    console.log("Chiboのソースコードを指定してください");
    process.exit(1);
}

console.log("Ruleset = syntax.pegjs" );
console.log("source code = " + process.argv[2] );

const source = fs.readFileSync( process.argv[2], "utf-8" );
let parser = pegjs.generate( ruleset );
let ast = parser.parse( source );

const global = {};

function binaryExec( left, op, right ) {
    let val1 = 0, val2 = 0;
    if( left.type == "Literal" )    val1 = left.value;
    else if( left.type == "Identifier" )    val1 = global[ left.name ];
    else if( left.type == "BinaryExpression" )  val1 = binaryExec( left.left, left.operator, left.right );
    if( right.type == "Literal" )    val2 = right.value;
    else if( right.type == "Identifier" )    val2 = global[ right.name ];
    else if( right.type == "BinaryExpression" )  val2 = binaryExec( right.left, right.operator, right.right );
    console.log( [val1, op, val2 ]);
    switch( op ) {
        case "+":   return val1 + val2; break;
        case "-":   return val1 - val2; break;
        case "*":   return val1 * val2; break;
        case "/":   return val1 / val2; break;
    }
}
switch( ast["type"] ) {
    case "Program":
        for( let line of ast["body"] ){
            console.log( line["type"] );
            switch( line["type"] ) {
                case "ExpressionStatement":
                    exp = line["expression"]["type"];
                    console.log( exp );
                    switch( exp ) {
                        case "AssignmentExpression":
                            let source = line["expression"]["right"];
                            switch( source["type"] ){
                                case "Literal":
                                    global[line["expression"]["left"]["name"]] = source["value"];
                                    break;
                                case "BinaryExpression":
                                    global[line["expression"]["left"]["name"]] = binaryExec( source.left, source.operator, source.right );
                                    break;
                            }
                            //global[]
                            break;

                    }
            }

        }
        break;
}
console.log( global );
