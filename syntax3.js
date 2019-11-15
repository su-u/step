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

// global: 変数を格納するハッシュ
const global = {};

// Objectクラス
global["Object"] = {};
global.Object["to_s"] = (obj) => String(obj);

// Numberクラス
global["Number"] = {};
global.Number["superClass"] = global.Object;
global.Number["+"] = (obj, param) => { return { value: (obj.value + param.value), class: "Number" } };
global.Number["-"] = (obj, param) => { return { value: (obj.value + param.value), class: "Number" } };
global.Number["*"] = (obj, param) => { return { value: (obj.value + param.value), class: "Number" } };
global.Number["/"] = (obj, param) => { return { value: (obj.value + param.value), class: "Number" } };

// Stringクラス
global["String"] = {};
global.String["superClass"] = global.Object;

function binaryExec( left, op, right ) {
    console.log( [ left, op, right] );
    let val1 = {}, val2 = {};
    if( left.type == "Literal" )    val1 = { value: left.value, class: left.class };
    else if( left.type == "Identifier" )    { console.log( global[ left.name ] ); val1 = global[ left.name ]; }
    else if( left.type == "BinaryExpression" )  val1 = binaryExec( left.left, left.operator, left.right );
    if( right.type == "Literal" )    val2 = { value: right.value, class: right.class };
    else if( right.type == "Identifier" )    val2 = global[ right.name ];
    else if( right.type == "BinaryExpression" )  val2 = binaryExec( right.left, right.operator, right.right );
    console.log( [val1, val2 ]);

    console.log( 48, val1.class );
    if( global[val1.class][ op ] )   return global[val1.class][ op ]( val1, val2 );
    else    console.log( "Methodが見つかりません");
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
                                    global[line.expression.left.name] = source["value"];
                                    break;
                                case "BinaryExpression":
                                    global[line.expression.left.name] = binaryExec( source.left, source.operator, source.right );
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
