const { argv } = require('process');
const { build } = require('esbuild');
const path = require('path');

const options = {
  // 以下のdefineプロパティを設定しない場合Reactのプロジェクトの実行時にエラーが出ます
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV ?? 'production' },
  entryPoints: [path.resolve(__dirname, 'src/index.ts')],
  minify: argv[2] === 'production',
  bundle: true,
  target: 'es2016',
  platform: 'browser',
  outdir: path.resolve(__dirname, 'dist'),
  tsconfig: path.resolve(__dirname, './tsconfig.build.json'),
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
