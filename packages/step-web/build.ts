import { build, BuildOptions, context } from 'esbuild';
const { argv } = require('process');
const path = require('path');
const sass = require('sass');

const sassPlugin = (options) => ({
  name: 'esbuild-plugin-sass',
  setup(build) {
    build.onLoad({ filter: /\.s[ac]ss$/ }, ({ path }) => {
      return new Promise((resolve) => {
        sass.render({ ...options, file: path }, (err, result) => {
          resolve({
            contents: result?.css,
            loader: 'css',
            errors: err ? [{ text: err.message }] : undefined,
          });
        });
      });
    });
  },
});

const options: BuildOptions = {
  entryPoints: [path.resolve(__dirname, 'src/index.tsx')],
  minify: argv[2] === 'production',
  bundle: true,
  target: 'es2016',
  platform: 'browser',
  outdir: path.resolve(__dirname, 'public/dist'),
  tsconfig: path.resolve(__dirname, './tsconfig.json'),
  plugins: [sassPlugin({})],
  sourcemap: true,
  chunkNames: 'chunks/[name]-[hash]',
};


(async () => {
  const ctx = await context(options);
  await ctx.watch().then(() => console.log('Done')).catch((err) => {
    process.stderr.write(err.stderr);
    process.exit(1);
  });
})();
