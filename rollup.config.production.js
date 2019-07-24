var resolve = require('rollup-plugin-node-resolve');
var uglify = require('rollup-plugin-uglify').uglify;
var terser = require('rollup-plugin-terser').terser;
var path = require('path');
var pkg = require('./package.json');
var deps = Object.keys(pkg.dependencies || {});

const targetName = 'index';
const umdName = 'ssGraph';

// 根据配置生成所需要的插件列表
const getPlugin = function({ shouldMinified, isES6 }) {
  let plugins = [resolve()];
  if (shouldMinified) {
    plugins.push(isES6 ? terser() : uglify());
  }
  return plugins;
};

// 根据这些配置项生成具体的 rollup 配置项
const compileConfig = function({
  fromDir,
  outputFileName,
  shouldMinified,
  format,
  external
}) {
  let outputFileArr = [outputFileName, 'js'];
  //
  if (shouldMinified) {
    outputFileArr.splice(1, 0, 'min');
  }
  return Object.assign(external ? { external: external } : {}, {
    input: path.resolve(fromDir, `${targetName}.js`),
    output: Object.assign(
      {
        exports: 'named' // 这个很关键，统一 cmd 的引用方式
      },
      format === 'umd'
        ? {
            name: umdName
          }
        : {},
      {
        file: path.join(__dirname, 'dist', outputFileArr.join('.')),
        format
      }
    ),
    plugins: getPlugin({ shouldMinified, isES6: format === 'es' })
  });
};

module.exports = [
  // browser-friendly UMD build
  compileConfig({
    fromDir: '.build.cjs',
    outputFileName: path.parse(pkg.browser).name,
    shouldMinified: false,
    format: 'umd'
  }),
  // browser-friendly UMD build, minified
  compileConfig({
    fromDir: '.build.cjs',
    outputFileName: path.parse(pkg.browser).name,
    shouldMinified: true,
    format: 'umd'
  }),

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  compileConfig({
    fromDir: '.build.cjs',
    external: deps,
    outputFileName: path.parse(pkg.main).name,
    shouldMinified: false,
    format: 'cjs'
  }),
  // minified
  compileConfig({
    fromDir: '.build.cjs',
    external: deps,
    outputFileName: path.parse(pkg.main).name,
    shouldMinified: true,
    format: 'cjs'
  }),

  // es
  compileConfig({
    fromDir: '.build.es',
    external: deps,
    outputFileName: path.parse(pkg.module).name,
    shouldMinified: false,
    format: 'es'
  }),
  // es, minified
  compileConfig({
    fromDir: '.build.es',
    external: deps,
    outputFileName: path.parse(pkg.module).name,
    shouldMinified: true,
    format: 'es'
  })
];
