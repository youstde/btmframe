var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack'),
    path=require('path'),
    ROOT_PATH=path.resolve(__dirname),
    APP_PATH=path.resolve(ROOT_PATH,'src'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [];
// plugins.push(new webpack.optimize.CommonsChunkPlugin({
//     name:"commonjs",
//     filename:"common.[chunkhash].js"
// }));
plugins.push(new UglifyJSPlugin());
plugins.push( new ExtractTextPlugin("styles.css"));
var webpackConfig = {
    entry: {
        app: path.resolve(APP_PATH, 'page/index/index.js')
    },
    output: {
        path: __dirname+'/dist/static',
        filename: '[name].[chunkhash].js'
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'html-loader'},
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'less-loader']
                })
            },
            {test: /\.ejs/, loader: 'ejs-loader?variable=data'}
        ]
    },
    plugins: plugins
};

module.exports = webpackConfig;
