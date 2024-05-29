const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = process.env.NODE_ENV === 'production';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static',
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/ws/': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        ws: true,
      },
    },
  },

  lintOnSave:false, //关闭eslint检查
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: `
        @import "@/assets/css/common.scss";
          `,
      },
    },
  },
  configureWebpack: (config) => {
    //去掉console
    // if (process.env.NODE_ENV === 'production') {
    //   config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    // }
    const sassLoader = require.resolve('sass-loader');
    config.module.rules.filter(rule => {
      return rule.test.toString().indexOf("scss") !== -1;
    }).forEach(rule => {
          rule.oneOf.forEach(oneOfRule => {
            const sassLoaderIndex = oneOfRule.use.findIndex(item => item.loader === sassLoader);
            oneOfRule.use.splice(sassLoaderIndex, 0,
                { loader: require.resolve("css-unicode-loader") });
          });
        });
    //开启Gzip
    const plugins = [];
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 0,
        minRatio: 0.8,
      })
    );
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: (config) => {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@HomeImg', resolve('src/assets/HomeImg'))
      .set('@LoginImg', resolve('src/assets/LoginImg'))
      .set('@ContractImg', resolve('src/assets/ContractImg'))
      .set('@IeoImg', resolve('src/assets/IEOImg'))
      .set('@MyImg', resolve('src/assets/MyImg'))
      .set('@InviteImg', resolve('src/assets/InviteImg'))
      .set('@AboutImg', resolve('src/assets/AboutImg'));

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    // config.plugin('html').tap(args => {
    //   if (IS_PROD) {
    //     args[0].cdn = cdn.build
    //   } else {
    //     args[0].cdn = cdn.dev
    //   }
    //   return args
    //  })

    /**
     * 设置保留空格
     */
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
        .test(/\.pdf$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          outputPath: "static/file"
        })
    /**
     * 打包分析
     */
    // if (IS_PROD) {
    //   config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
    //     {
    //       analyzerMode: 'static'
    //     }
    //   ])
    // }
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_PROD, (config) => config.devtool('cheap-source-map'));

    config.when(IS_PROD, (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true, // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      });
      config.optimization.runtimeChunk('single');
    });
  },
};
