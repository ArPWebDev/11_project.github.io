const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{ 
            test: /\.js$/, 
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ 
        },
        {
            test: /\.css$/i,
            use: [
                (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                {
                    loader:'css-loader',
                    options: {
                        importLoaders: 2
                    } 
                }, 
                'postcss-loader'
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
        },
        {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                'file-loader?name=./images/[name].[ext]',
                {
                    loader: 'image-webpack-loader'
                }
            ]
       }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            /* hash: true, */
            template: './index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        new OptimizeCssAssetsPlugin({assetNameRegExp: /\.css$/g, cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: { preset: ['default'],}, canPrint: true
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}) 
    ]
}