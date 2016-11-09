var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: './src/app/App.ts',
        style: './src/assets/sass/style.scss'
    },
    output: {
        path: './dist',
        filename: '[name].bundle.js'

    },
    devtool: 'source-map',
    devServer: {inline: true, outputPath: "./dist"},
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015!ts-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }

        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/assets', to: "assets" }
        ]),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: "index.html"
        })
    ]
};