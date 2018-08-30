/*  eslint no-undef:0 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const FILES_DIRS_TO_COPY = [
    'robots.txt', 'README.md', 'LICENSE.txt', 'humans.txt', 'CNAME', 'src/files/',
];

module.exports = {
    devtool: 'eval-source-map',
    entry: {main: './src/index.js'},
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [require('@babel/plugin-proposal-object-rest-spread')],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 100,
                            },
                            optipng: {
                                optimizationLevel: 6,
                            },
                            pngquant: {
                                enabled: false,
                            },
                            gifsicle: {
                                interlaced: true,
                                optimizationLevel: 3,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin(
            FILES_DIRS_TO_COPY
        ),
    ],
};
