/*  eslint no-undef:0 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const FILES_DIRS_TO_COPY = [
    'robots.txt', 'README.md', 'LICENSE.txt', 'humans.txt', 'CNAME', 'src/files/',
];
const FONT_BASE = 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:500';
const GLYPHS = [
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ...'abcdefghijklmnopqrstuvwxyz',
    ...'0123456789',
    ...'-/*., ',
];
const FAVICON_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQIHWP4//8XAAX5AvnvHiluAAAAAElFTkSuQmCC';

module.exports = (_, {mode}) => {
    process.env.NODE_ENV = mode;
    return {
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
                            minified: mode === 'production',
                            sourceMaps: mode !== 'production',
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
                minify: mode === 'production' ? [
                    'collapseWhitespace',
                    'minifyJS',
                    'removeComments',
                    'useShortDoctype',
                ].reduce((acc, k) => {
                    acc[k] = true;
                    return acc;
                }, {}) : false,
                template: './src/index.html',
                filename: 'index.html',
                fontURI: `${FONT_BASE}&text=${encodeURIComponent(GLYPHS.join(''))}`,
                faviconBase64: FAVICON_BASE64,
            }),
            new CopyWebpackPlugin(
                FILES_DIRS_TO_COPY
            ),
        ],
    };
};
