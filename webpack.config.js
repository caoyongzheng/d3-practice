const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = isProduction ? '/d3-practice/' : '/dist/';
const port = 9000;

const config = {
  entry: {
    vendor: ['d3', 'd3-axis', 'd3-scale'],
    bar: './src/bar.js',
  },
  output: {
    filename: '[name]-[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [/node_modules/, path.resolve(__dirname, 'src', 'lib')],
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[chunkhash:8].js',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      chunks: [],
      template: path.resolve(__dirname, 'src/index.html'),
      filename: path.join(__dirname, 'dist', 'index.html'),
    })
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    port,
    compress: true,
    publicPath,
    disableHostCheck: true,
    noInfo: true,
  },
};

console.log(`http://0.0.0.0:9000/dist/index.html`);
Object.keys(config.entry).filter(e => e !== 'vendor').forEach((e) => {
  config.plugins.push(new HtmlWebpackPlugin({
    chunks: ['vendor', e],
    template: path.resolve(__dirname, 'src/template.html'),
    filename: path.join(__dirname, 'dist', `${e}.html`),
  }));
  console.log(`http://0.0.0.0:9000/dist/${e}.html`);
});

if (isProduction) {
  const CleanAssetsPlugin = new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname),
    verbose: true,
    dry: false,
  });
  config.plugins.push(CleanAssetsPlugin);
}

module.exports = config;
