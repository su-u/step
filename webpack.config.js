const path = require('path');
module.exports = {
  entry: './webSrc/index.tsx',
  output: {
    path: `${__dirname}/public/dist`,
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.(tsx|ts)$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,

              importLoaders: 2
            },
          },
          {
            loader: 'sass-loader',

          }
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', 'scss'],
    plugins: [],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  }
}