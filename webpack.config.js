var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/app/App.ts',
        style: './src/assets/css/style.scss'
    },
    output: {
        path: './dist',
        filename: '[name]].bundle.js',
        publicPath: "/"
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
                loaders: ["css?sourceMap", "sass?sourceMap"]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html' },
            // { from: 'src/assets/css', to: "assets/css" },
            { from: 'src/assets/img', to: "assets/img" },
            { from: 'src/assets/js', to: "assets/js" }
        ]),
        new webpack.optimize.UglifyJsPlugin()
    ]
};