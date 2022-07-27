import webpack from "webpack";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config: webpack.Configuration = {
  entry: {
    background: path.join(__dirname, "src/background/index.ts"),
    script: path.join(__dirname, "src/background/script.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/js"),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 2,
              workerParallelJobs: 80,
              workerNodeArgs: ["--max-old-space-size=512"],
              name: "ts-loader-pool",
            },
          },
          {
            loader: "esbuild-loader",
            options: {
              loader: "ts",
              target: "es2015",
            },
          },
        ],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 2,
              workerParallelJobs: 80,
              name: "tsx-loader-pool",
            },
          },
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2015",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/public", to: ".." }],
    }),
  ],
};

module.exports = config;
