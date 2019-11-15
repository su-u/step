const pegjs = require('pegjs');
const fs = require('fs');

const ruleset = fs.readFileSync("syntax.pegjs", "utf-8");

if( process.argv.length == 0 ) {
    console.log("Chiboのソースコードを指定してください");

} else {
    console.log("Ruleset = syntex.pegjs" );
    console.log("source code = " + process.argv[2] );
    const source = fs.readFileSync( process.argv[2], "utf-8" );
    let parser = pegjs.generate( ruleset );
    console.log( JSON.stringify( parser.parse( source ) ) );
}
