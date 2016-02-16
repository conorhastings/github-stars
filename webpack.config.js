'use strict';

const path = require('path');
const webpack = require('webpack');

const definePlugin = {
	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
};

module.exports = {
	entry: './src/index.js',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: require.resolve('babel-loader'),
				include: path.join(__dirname, 'src'),
				exclude: path.join(__dirname, 'node_modules')
			}
		]
	},
	plugins: [new webpack.DefinePlugin(definePlugin)]
};