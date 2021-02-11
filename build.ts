const { argv } = require('process')
const { build } = require('esbuild')
const path = require('path')
const sass = require('sass');

const sassPlugin = options => ({
  name: 'esbuild-plugin-sass',
  setup(build) {
    build.onLoad({ filter: /\.s[ac]ss$/ }, ({ path }) => {
      return new Promise(resolve => {
        sass.render({ ...options, file: path }, (err, result) => {
          resolve({
            contents: result?.css,
            loader: 'css',
            errors: err ? [{ text: err.message }] : undefined,
          })
        })
      })
    })
  },
})

const options = {
  // 以下のdefineプロパティを設定しない場合Reactのプロジェクトの実行時にエラーが出ます
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV },
  entryPoints: [path.resolve(__dirname, 'webSrc/index.tsx')],
  minify: argv[2] === 'production',
  bundle: true,
  target: 'es2016',
  platform: 'browser',
  outdir: path.resolve(__dirname, 'dist'),
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  plugins: [sassPlugin({})],
}

build(options).catch(err => {
  process.stderr.write(err.stderr)
  process.exit(1)
})