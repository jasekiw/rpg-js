const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname , 'src', 'app', 'App.ts'),
        style: path.resolve(__dirname , 'src', 'assets', 'sass', 'style.scss')
    },
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: '[name].bundle.js'

    },
    // optimization: {
    //     minimize: true
    // },
    devtool: 'source-map',
    mode: "development",
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015!ts-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
            }

        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/assets', to: "assets" }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: "index.html"
        })
    ]
};