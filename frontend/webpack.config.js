const Webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    // AutoPrefixer = require('autoprefixer'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        './js/app.js'
    ],

    output: {
        filename: './js/app.js'
    },

    devServer: {
        port: 9999,
        hot: true,
        open: true
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.css', '.hbs', '.js', '.png']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    },
                    'eslint-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'file-loader'
                  }
                ]
            },

            /* {
                test: /\.(png)$/i,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'url-loader'
                  }
                ]
            }, */

            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'handlebars-loader',
                        options: {
                            helperDirs: [
                                __dirname + '/js/helpers/handlebars'
                            ]
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new UglifyJsPlugin()
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                useShortDoctype: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/app.css'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
};