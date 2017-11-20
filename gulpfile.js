var gulp = require('gulp');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackdevserver = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var webpackDevConfig = require('./webpack.dev.config.js');
var path = require('path');
var globs = require('globs');
var spawn = require('child_process').spawn;
const del = require('del');


/**
 * 获取入口文件
 * @param callback
 */
var getEntry = function(callback){
    globs('./src/page/*/index.js',function(err,files){
        var entry = {};
        files.forEach(function(file){
            console.log('BeforeName:',file);
            console.log('AfterName:',file.replace('./src/page/','').replace('/index.js',''));
            var name = file.replace('./src/page/','').replace('/index.js','');
            entry[name] = file;
        });
        callback(entry);
    })
};

/**
 * 删除dist文件
 */
var delDist = function(type){
    del.sync(type.output.path);
};

/**
 * 编译并返回compiler
 * @param entry
 * @returns {*}
 */
var compile = function(type,entry){
    type.entry = entry;
    Object.keys(entry).forEach(function(key){
        var plugin = new HtmlWebpackPlugin({
            template:'src/page/'+key+'/html.js',
            filename:key+'.html',
            inject:true,
            chunks:['commonjs',key]
        });
        type.plugins.push(plugin);
    });


    return webpack(type,function(err,stats){
        if(err){
            throw err;
        }
    });
};

/**
 * gulp dev
 */
gulp.task('dev',function(){
    webpackDevConfig.devtool = 'source-map';
    delDist(webpackDevConfig);
    getEntry(function(entry){
        var compiler = compile(webpackDevConfig, entry);
        const server = new webpackdevserver(compiler,{
            inline:true,
            contentBase: webpackDevConfig.output.path,
            hot: false,
            historyApiFallback: true,
            stats:{
                colors:true
            }
        });
        server.listen(8080, '127.0.0.1', function() {});
        setTimeout(function(){
            spawn('open',['http://127.0.0.1:8080/index.html'])
        },1500);
    })
});

/**
 * gulp pre
 */
gulp.task('pre',function(){
    var cwd = process.cwd();
    var pathObj = path.parse(cwd);
    delDist(webpackConfig);
    getEntry(function(entry){
        webpackConfig.output.publicPath="//oss.ltcdn.cc/pre/baitai-game/"+pathObj.name+"/";
        var compiler = compile(webpackConfig, entry);
    })
});

/**
 * gulp prod
 */
gulp.task('prod',function(){
    var cwd = process.cwd();
    var pathObj = path.parse(cwd);
    delDist(webpackConfig);
    getEntry(function(entry){
        webpackConfig.output.publicPath="//oss.ltcdn.cc/prod/baitai-game/"+pathObj.name+"/";
        var compiler = compile(webpackConfig, entry);
    })
});


gulp.task('mock', function () {
    var kitty = require('vkitty');
    var serve = require('kitty-serve');
    kitty.watch(['./mock/api/*/h5/lottery/*'])
        .pipe(serve.src(
            {
                port: 7001,
                prePath: "/api/",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            }
        ))
});