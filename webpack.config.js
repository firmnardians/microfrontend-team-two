const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
	entry: './src/index',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 8087,
	},
	target: 'web',
	resolve: {
		extensions: ['.css', '.scss', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: {
								filter: (url) => {
									if (url.startsWith('data:')) {
										return false;
									}
									return true;
								},
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
		}),
		new ModuleFederationPlugin({
			name: 'TEAM_TWO',
			filename: 'moduleEntry.js',
			exposes: {
				'./app': './src/App',
			},
		}),
	],
};
