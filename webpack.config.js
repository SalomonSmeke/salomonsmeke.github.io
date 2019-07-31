/*  eslint no-undef:0 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

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
const FONT_URI = `${FONT_BASE}&text=${encodeURIComponent(GLYPHS.join(''))}`;

const browserlistQuery = (mode) => {
    if (mode === 'production') return '> 2%, last 1 edge versions, last 3 chrome versions, last 2 safari versions, last 2 firefox versions';
    return 'last 1 safari version, last 1 firefox version';
};

module.exports = (_, {mode}) => {
    process.env.NODE_ENV = mode;
    isProduction = mode === 'production';

    return {
        devtool: 'eval-source-map',
        entry: {main: './src/index.js'},
        output: {
            filename: '[hash].js',
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
                            presets: [
                                ['@babel/preset-env', {'targets': browserlistQuery(mode)}],
                            ].concat(isProduction ? ['minify'] : []),
                            plugins: ['@babel/plugin-proposal-object-rest-spread'],
                            minified: isProduction,
                            sourceMaps: !isProduction,
                        },
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                autoprefixer: {
                                    browsers: browserlistQuery(mode),
                                },
                                plugins: [
                                    require('cssnano'),
                                    require('autoprefixer'),
                                ],
                            },
                        },
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
            new webpack.DefinePlugin({'process.env.FONT_URI': JSON.stringify(FONT_URI)}),
            new CleanWebpackPlugin({path: path.resolve(__dirname, 'dist')}),
            new MiniCssExtractPlugin({
                filename: 'style.[hash].css',
            }),
            new HtmlWebpackPlugin({
                inject: false,
                hash: true,
                minify: isProduction ? [
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
                fontURI: FONT_URI,
                faviconBase64: FAVICON_BASE64,
            }),
            new CopyWebpackPlugin(
                FILES_DIRS_TO_COPY
            ),
        ],
    };
};
