const pegjs = require('pegjs');
const fs = require('fs');
const util = require('util');

const syntax_file = "new_syntax.pegjs";
const ruleset = fs.readFileSync( syntax_file, "utf-8");

if( process.argv.length == 0 ) {
    console.log("Chiboのソースコードを指定してください");
    process.exit(1);
}

console.log("Ruleset = " + syntax_file );
console.log("source code = " + process.argv[2] );

const source = fs.readFileSync( process.argv[2], "utf-8" );
let parser = pegjs.generate( ruleset );
let ast = parser.parse( source );

console.log(util.inspect(ast,false,null));
