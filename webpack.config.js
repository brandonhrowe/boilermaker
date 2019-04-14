module.exports = {
  entry: ["babel-polyfill", "./client/index.js"], // assumes your entry point is the index.js in the root of your project folder
  mode: "development",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devtool: "source-maps",
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
