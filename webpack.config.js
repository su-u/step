module.exports = {
  entry: {
    'chiba-lang': [`./src/web.ts`],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'web.js',
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [],
  },
}