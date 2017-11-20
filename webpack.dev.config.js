var webpack = require('webpack');

var plugins = [];
// plugins.push(new webpack.optimize.CommonsChunkPlugin({
//     name:"commonjs",
//     filename:"common.[chunkhash].js"
// }));
var webpackConfig = {
    output: {
        path: __dirname+'/dist/static',
        filename: '[name].[chunkhash].js'
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.css/, loader: 'style-loader!css-loader'},
            {test: /\.ejs/, loader: 'ejs-loader?variable=data'}
        ]
    },
    plugins: plugins
};

module.exports = webpackConfig;
