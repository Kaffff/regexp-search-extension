import webpack from "webpack";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  entry: {
    content: path.join(__dirname, "src/content/index.ts"),
    popup: path.join(__dirname, "src/popup/index.tsx"),
    background: path.join(__dirname, "src/background/index.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/js"),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: { loader: "tsx", target: "es2015" },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/public", to: ".." }],
    }),
  ],
};

module.exports = config;
