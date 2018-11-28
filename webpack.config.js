const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const modules = require('./webpack.config.modules');

const publicPath = '/';
const srcPath = path.join(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

const config = {
    devtool: 'source-map',
    entry: {
        app: path.join(srcPath, 'index.jsx'),
        vender: ['react',
            'react-dom',
            'react-router-dom',
            'react-redux'
        ]
    },

    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: '[name].bundle-[hash].js',
    },
    module: modules,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'developmant'),
            'process.env.BASE_URL': JSON.stringify('http://192.168.2.103:8888/api'),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),

        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 3000,
        host: 'localhost',
        disableHostCheck: true,
        historyApiFallback: true,
    },
};
module.exports = config;