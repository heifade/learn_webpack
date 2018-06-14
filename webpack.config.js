const webpack = require("webpack");
const path = require("path");
const HttpWebpackPlugin = require("html-webpack-plugin");

module.exports = async function(env, pars) {
  return {
    mode: "development",
    context: path.resolve(__dirname, "."),
    entry: {
      index: "./src/index"
    },
    output: {
      path: path.resolve(__dirname, "./dist")
    },
    module: {},
    plugins: [
      new HttpWebpackPlugin({
        title: "learn webpack",
        template: path.resolve(__dirname, "./public/index.html")
      })
    ]
  };
};
