const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const HttpWebpackPlugin = require("html-webpack-plugin");

module.exports = async function(env, pars) {
  return {
    mode: "development",
    // mode: "production",
    context: path.resolve(__dirname, "."),
    entry: {
      index1: "./src/index"
      // index2: "./src/index2"
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[hash:4].js",
      chunkFilename: "chunk.[name].[hash:4].js"
    },
    devtool: "source-map",
    resolve: {
      extensions: [".js"],
      mainFields: ["module", "main"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: require("./babel.config")
        }
      ]
    },
    optimization: {
      // minimize: true,
      namedModules: false,
      namedChunks: false,

      minimizer: [
        new UglifyJsPlugin({
          parallel: true, // CPU 核数 - 1
          sourceMap: true,
          uglifyOptions: {
            output: {
              commons: false
              // beautify: false,
            }
          }
        })
      ],
      splitChunks: {
        chunks: "all",
        // automaticNameDelimiter: "_",
        // minSize: 30000,
        // minChunks: 1,
        // maxAsyncRequests: 5,
        // maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: 0,  // 优先级
            reuseExistingChunk: true
          },
          // 将node_modules下 异步加载的模块打包到 vendor-async.js 里
          vendor_async: {
            test: /node_modules/,
            chunks: "async",
            name: "vendor-async",
            priority: 10, // 优先级
            enforce: true // 强制执行(即使没有达到大小)
          },
          // 将node_modules下 非异步加载的模块打包到 vendor-initial.js 里
          vendor_init: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor-initial",
            priority: 10, // 优先级
            enforce: true // 强制执行(即使没有达到大小)
          },
          // 将 异步加载的模块打包到 commons-async.js 里
          commons_async: {
            name: "commons-async",
            chunks: "async",
            // minChunks: 2
            enforce: true // 强制执行(即使没有达到大小)
          },
          commons_init: {
            name: "commons-init",
            chunks: "initial",
            enforce: true, // 强制执行(即使没有达到大小)
            // minChunks: 2
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
    plugins: [
      new HttpWebpackPlugin({
        title: "learn webpack",
        filename: "index.html",
        template: path.resolve(__dirname, "./public/index.html"),
        meta: { viewport: "width=device-width, initial-scale=1, shrink-to-fit=no" },
        // chunks: ["index1"],
        hash: true
      }),
      // new webpack.optimize.MinChunkSizePlugin({
      //   minChunkSize: 10000000 // Minimum number of characters
      // })
      // new HttpWebpackPlugin({
      //   title: "learn webpack",
      //   filename: "index2.html",
      //   template: path.resolve(__dirname, "./public/index.html"),
      //   meta: { viewport: "width=device-width, initial-scale=1, shrink-to-fit=no" },
      //   hash: true,
      //   cache: true,
      //   chunks: ["index2"],
      //   inject: 'head',
      //   minify: {
      //     removeComments: true,
      //     collapseWhitespace: true
      //   }
      // })
    ]
  };
};
