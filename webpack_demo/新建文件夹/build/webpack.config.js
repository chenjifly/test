const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var webpack = require("webpack");


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../output/static'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        //解决webpack4.0在编译时挂载不到app上
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },{
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },{
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /node_modules/
            }
        ]
    }
}
