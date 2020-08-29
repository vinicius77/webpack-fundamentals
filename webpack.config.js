const path = require("path");

const config = {
  // specifies the file that will serve as the entry point for bundling the application
  entry: ["@babel/polyfill", "./src/index.js"],
  /** The output property defines the location where
   * the bundled code will be stored.
   * The target directory must be defined as an
   * absolute path which is easy to create with
   * the path.resolve method.
   *
   * __dirname is a global variable in Node which
   * stores the path to the current directory. */
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    port: 3000
  },
  module: {
    rules: [
      {
        /** test property specifies that the loader is for files that have names ending with .js */
        test: /\.js$/,
        /** loader property specifies that the processing for those files will be done with babel-loader */
        loader: "babel-loader",
        /** query property is used for specifying parameters for the loader, that configure its functionality */
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};

/** the configuration object is exported by using
 *  Node's module syntax.  */
module.exports = config;
