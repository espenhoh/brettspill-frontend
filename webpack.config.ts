import path from "path";
import { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

interface Environment {
  production: boolean;
  // Define other environment variables here if needed
}

interface Arguments {
  mode: "development" | "production" | "none";
  // Define other arguments here if needed
}

//Make config a function to be able to access args
const config = (env: Environment, argv: Arguments): Configuration => {
  const isDev = argv.mode === "development";

  console.log("Development: ", isDev);

  return {
    mode:
      (argv.mode as "production" | "development" | undefined) ?? "development",
    entry: "./src/index.tsx", // Entry point of your application
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
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        { test: /\.json$/, type: "json" },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
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

export default config;
