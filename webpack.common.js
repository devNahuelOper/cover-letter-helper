const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    publicPath: "./dist",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      fs: "pdfkit/js/virtual-fs.js",
    },
  },
  plugins: [new NodePolyfillPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
          },
        },
      },
      {
        enforce: "post",
        test: /fontkit[/\\]index.js$/,
        use: {
          loader: "transform-loader?brfs",
        },
      },
      {
        enforce: "post",
        test: /unicode-properties[/\\]index.js$/,
        use: {
          loader: "transform-loader?brfs",
        },
      },
      {
        enforce: "post",
        test: /linebreak[/\\]src[/\\]linebreaker.js/,
        use: {
          loader: "transform-loader?brfs",
        },
      },
      {
        test: /\.afm$/,
        use: {
          loader: "raw-loader",
        }
      },
    ],
  },
};
