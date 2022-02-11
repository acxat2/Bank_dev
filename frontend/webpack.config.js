const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    // publicPath: '/',   для работы с сылками-путями
  },

  module: {
    rules: [
      {
        //       test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //       type: 'asset/resource',
        //     },
        //     // {
        //     //   test: /\.css$/,
        //     //   use: [MiniCssExtractPlugin.loader, "css-loader"],
        //     // },
        //     {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coin',
    }),
    new MiniCssExtractPlugin({
      linkType: 'text/css',
    }),
  ],

  devServer: {
    // historyApiFallback: true,
    hot: true,
  },
};
