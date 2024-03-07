const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

//Make exports a function to be able to access args
module.exports = (env, argv) => {
  const mode = argv.mode;
  const isDev = mode === "development";

  console.log("Development: ", isDev);

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
      new MiniCssExtractPlugin({ filename: "style.css" }),
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
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devtool: isDev ? "eval-source-map" : false,

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
