/*
 *	Webpack Configuration docs
 *	https://webpack.js.org/configuration/
 */
const path = require('path');

/*
 *	additional, standard plugins:
 *
 *	For extracting CSS out of JS: 
 *	https://github.com/webpack-contrib/mini-css-extract-plugin
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
 *	For optmizing CSS:
 *	https://github.com/webpack-contrib/css-minimizer-webpack-plugin
 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/**
 *  For Inlining CSS in DOM:
 *  https://github.com/Runjuu/html-inline-css-webpack-plugin
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
    entry: {
        global: './_js/global.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist/assets/js'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'webpack')
                ],
                use: [
                    {
                        // https://github.com/babel/babel-loader
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
        ]
    },

    devtool: "source-map",
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "../css/[name].css",
            chunkFilename: "../css/[id].css"
        }),
        new HTMLInlineCSSWebpackPlugin(),
    ],
    //https://webpack.js.org/configuration/optimization/
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`, //use existing plugins, i.e. build-in TerserWebpackPlugin 
            new CssMinimizerPlugin(),
        ],
    },
};