const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

//Make exports a function to be able to access args
module.exports = (env, argv) => {
  console.log("Current mode: ", argv.mode);

  return {
    entry: "./src/index.js", // Entry point of your application
    output: {
      filename: "bundle.js", // Output bundle file name
      path: path.resolve(__dirname, "dist"), // Output directory
      publicPath: "/", // base path for all the assets
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devtool: "eval-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      }, // Serve files from this directory
      port: 3000, // Port for the development server
      open: true, // Open the default web browser when the server starts
      historyApiFallback: true, //redirect 404s to /index.html.
    },
  };
};
