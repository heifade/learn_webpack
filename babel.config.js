module.exports = {
  plugins: [
    [
      "transform-runtime",
      {
        polyfill: false
      }
    ],
    "syntax-dynamic-import"
  ],
  presets: [
    [
      "babel-preset-env",
      {
        modules: false,
        targets: {
          browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11", "iOS >= 8", "Android >= 4"]
        }
      }
    ]
  ]
};
