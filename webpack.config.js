'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry : {
		bundle : [ './src/main.js' ]
	},
	output : {
		path : './dist',
		filename : '[name].js'
	},
	module : {
		loaders : [
			{
				test : /\.css$/,
				loader : ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
			},
			{
				test : /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
				loader : 'file-loader',
				query : {
					name: '[path][name].[ext]'
				}
			}
		]
	},
	plugins : [
		new ExtractTextPlugin('style.css', {
			allChunks : true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress : {
				warnings : false,
			},
			mangle : false
		})
	]
}
