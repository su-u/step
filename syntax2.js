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
                            }
                            //global[]
                            break;
                    }
            }
            
        }
        break;
}
console.log( global );
