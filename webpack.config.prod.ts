import webpackConfig from "./webpack.config";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

const CssOptions: MiniCssExtractPlugin.PluginOptions = {
  filename: "[name].[contenthash].css",
};

const productionConfig = merge(webpackConfig, <Configuration>{
  mode: "production",
  plugins: [new MiniCssExtractPlugin(CssOptions)],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
  },
});

export default productionConfig;
