const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    return {
        entry: path.join(__dirname, "src", "index.js"),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            alias: {
                components: path.join(__dirname, "src", "components"),
                entity: path.join(__dirname, "src", "domain", "entity"),
                repository: path.join(__dirname, "src", "domain", "repository"),
            },
        },
        mode: 'development',
        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, './dist'),
            open: true,
            compress: true,
            hot: true,
            port: 3000,
        },

        module: {
            rules: [
                {
                    test: /\.jsx$|\.es6$|\.js$/,
                    use: {
                        loader: 'babel-loader'
                    },
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: (options.mode == 'production' ? true : false),
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
                },
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                filename: 'index.html',
            }),
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],

    }
};