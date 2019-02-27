const webpack = require('webpack');
const path = require('path');

const RNPath = path.resolve(__dirname,'node_modules/react-native/Libraries')
const CompPath = path.resolve(RNPath,'Components')
const TSLintPlugin = require('tslint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

module.exports = {
 entry: {
   main: './index.js'
 },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
	target:'web',
	devServer: {
    contentBase: '/'
  },

  plugins: [
    new TSLintPlugin({
      files: ['src/**/*.ts']
    }),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      //inject: false,
      //template: path.resolve('index.html')
    })//inject bug fix double init on start

    /*new ExtractCssChunks(
    {
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
      reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      cssModules: true // if you use cssModules, this can help.
    })*/
  ],
  module: {
    rules: [
		  {
				test: /\.ts?$/,
				exclude: /node_modules/,
				use: ['ts-loader']
			},
      {
				test: /\.js?$/,
				exclude:/node_modules/,
				use: ['babel-loader']
			},
			{
				// Preprocess our own .css files
				test: /\.css$/,
				exclude: /node_modules/,
				//loader: 'MiniCssExtractPlugin'
        //output: path.resolve('app/static');
				use: [
					{loader:'style-loader'},
          {loader:'MiniCssExtractPlugin.loader'},
					{loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
						  modules: true
						}
					}
				]
			},
			{
				test: /\.(jpg|png|svg|ico|icns)$/,
				use:[
					{loader: 'file-loader',
						options: {
						name: './[name].[ext]'
						}
					}
				]
			}
    ]
  },
  resolve: {
		modules:["node_modules"],
    extensions: [".tsx", ".ts", ".js", ".json"]
  }
}
