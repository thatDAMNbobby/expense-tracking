var webpack = require('webpack');
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'app.js',
    },
    plugins: [
		new webpack.ProvidePlugin({
			m: 'mithril'
		})
	],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /\/node_modules\//,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
}