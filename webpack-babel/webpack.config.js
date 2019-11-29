const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        first: path.resolve(__dirname, 'src', 'first.js'),
        second: path.resolve(__dirname, 'src', 'second.js'),

        background: path.resolve(__dirname, 'src', 'background.css'),
        font: path.resolve(__dirname, 'src', 'font.css'),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].min.css" }),
        new FixStyleOnlyEntriesPlugin(),
        new OptimizeCSSAssetsPlugin({}),

    ]
};