var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
module.exports = {
    entry: './src/app/App.ts',
    output: {
        path: './dist',
        filename: 'app.bundle.js',
        publicPath: "/"
    },
    devtool: 'source-map',
    devServer: {inline: true},
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015!ts-loader'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html' },
            { from: 'src/assets', to: "assets" }
        ])
    ]
};