const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: ["/node_modules/", "/tests/"],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [],
  resolve: {
    extensions: [".ts", ".js"],
  },
  externalsPresets: { node: true },
  output: {
    filename: "kb-generator.js",
    path: path.resolve(process.cwd(), "build"),
    libraryTarget: "commonjs",
    library: "kb-generator",
    globalObject: "this",
  },
};
