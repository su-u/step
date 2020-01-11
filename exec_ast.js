const fs = require('fs');

if( process.argv.length == 0 ) {
    console.log("ASTファイルを指定してください");
    process.exit(1);
}

console.log("source code(AST) = " + process.argv[2] );

const ast = fs.readFileSync( process.argv[2], "utf-8" );

// オブジェクトのタイプ
const TYPE = {
    VARIABLE: "Varibale",
    FUNCTION: "Function",
    BLOCK:  "Block"
}

// global: 変数を格納するハッシュ
const global = {};

// Objectクラス
global["Object"] = {};
//global.Object.className = "Object";
global.Object["to_s"] = (obj, params, options) => String(obj);
global.Object["superClass"] = null;
global.Object["="] = (obj, params, options) => { return { value: ( obj.value == params[0].value), class: "Boolean", type: TYPE.VARIABLE } };

// Numberクラス
global["Number"] = {};
//global.Number.className = "Number";
global.Number["superClass"] = global.Object;
global.Number["+"] = (obj, params, options) => { return { value: (obj.value + params[0].value), class: "Number", type: TYPE.VARIABLE } };
global.Number["-"] = (obj, params, options) => { return { value: (obj.value - params[0].value), class: "Number", type: TYPE.VARIABLE } };
global.Number["*"] = (obj, params, options) => { return { value: (obj.value * params[0].value), class: "Number", type: TYPE.VARIABLE } };
global.Number["/"] = (obj, params, options) => { return { value: (obj.value / params[0].value), class: "Number", type: TYPE.VARIABLE } };
global.Number["<"] = (obj, params, options) => { return { value: (obj.value < params[0].value), class: "Boolean", type: TYPE.VARIABLE } };
global.Number["<="] = (obj, params, options) => { return { value: (obj.value <= params[0].value), class: "Boolean", type: TYPE.VARIABLE } };
global.Number[">"] = (obj, params, options) => { return { value: (obj.value > params[0].value), class: "Boolean", type: TYPE.VARIABLE } };
global.Number[">="] = (obj, params, options) => { return { value: (obj.value >= params[0].value), class: "Boolean", type: TYPE.VARIABLE } };
global.Number["to_s"] = (obj, params, options) => { return String(obj.value) };

// Stringクラス
global["String"] = {};
global.String["superClass"] = global.Object;
global.String["+"] = (obj, params, options) => {
    if( params[0].class == "String" ) {
        return { value: (obj.value + params[0].value), class: "String", type: TYPE.VARIABLE };
    } else {
        console.log( [41, obj, params ]);
        let str = exec( params[0], global[params[0].class], "to_s" );
        return { value: (obj.value + str), class: "String", type: TYPE.VARIABLE };
    }
};

// Consoleクラス
global["Console"] = {};
global.Console["superClass"] = global.Object;
global.Console["default"] = ( obj, params, options ) => {
    console.log( obj );
    return obj;
};

/**
 * メソッドの実行（メソッドが存在しない場合は親クラスを探しに行く）
 * @param {object}  obj         レシーバ
 * @param {string}  className   レシーバのクラス名
 * @param {string}  method      メソッド名
 * @param {object}  [params]      パラメータの配列
 * @param {object}  [options]     キーワードパラメータのハッシュ
 * @return {object}
 */
function exec( obj, classN, method, params, options ) {
    console.log( [57, obj, classN, method, params, options]);
    if( classN[method] ) {
        console.log("59");
        return classN[method]( obj, params, options );
    } else {
        console.log("62");
        if( classN.superClass != null ) {
            return exec( obj, classN.superClass, method, params, options );
        } else {
            throw new Error("メソッドが見つかりません");
        }
    }
}


/**
 * 2項演算子の展開および実行
 * @param {object}  left    2項演算子の左側
 * @param {string}  op      メソッド名
 * @param {object}  right   2項演算子の右側
 * @returns {object}
 */
function binaryExec( left, op, right ) {
    console.log( [ left, op, right] );
    let val1 = {}, val2 = {};
    if( left.type == "Literal" )    val1 = { value: left.value, class: left.class, type: TYPE.VARIABLE };
    else if( left.type == "Identifier" )    { console.log( global[ left.name ] ); val1 = global[ left.name ]; }
    else if( left.type == "BinaryExpression" )  val1 = binaryExec( left.left, left.operator, left.right );
    if( right.type == "Literal" )    val2 = { value: right.value, class: right.class, type: TYPE.VARIABLE };
    else if( right.type == "Identifier" )    val2 = global[ right.name ];
    else if( right.type == "BinaryExpression" )  val2 = binaryExec( right.left, right.operator, right.right );
    console.log( [val1, val2 ]);

    return exec( val1, global[val1.class], op, [val2] );
    // メソッドの実行
    //if( global[val1.class][ op ] )   return global[val1.class][ op ]( val1, [val2] );
    //else    console.log( "Methodが見つかりません");
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
                                    global[line.expression.left.name] = { value: source.value, class: source.class, type: TYPE.VARIABLE };
                                    break;
                                case "BinaryExpression":
                                    global[line.expression.left.name] = binaryExec( source.left, source.operator, source.right );
                                    break;
                                default:
                                    console.log( source["type"]);
                            }
                            //global[]
                            break;

                    }
            }

        }
        break;
}
console.log( global );
