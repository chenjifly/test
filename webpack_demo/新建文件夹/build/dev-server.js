var express = require("express");
var webpack = require("webpack");
var config = require('./webpack.dev.conf');

var app = express();

var compiler = webpack(config);

// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks:false
    }
})

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function(compilation){
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb){
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)





app.use(devMiddleware);
app.use(hotMiddleware)

app.listen(1010, function(err){
    if(err){
        console.log(err)
        return
    }
    console.log('listen at http://localhost:1010');
})
