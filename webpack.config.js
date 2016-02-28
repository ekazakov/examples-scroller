var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

var devServer = [
    'webpack-dev-server/client?http://0.0.0.0:3010',
    'webpack/hot/only-dev-server',
    './src/index.js'
];

var dist = './src/index.js';
var plugins = [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
];

if (isProd) {
    plugins = plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        }),
        new CopyWebpackPlugin([
            {from: './static/index.html'},
            {from: './static/stubs.js'}
        ])
    ]);
} else {
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ]);
}

module.exports = {
    devtool: isProd ? 'source-map' : 'eval',
    entry: {
        index: isProd ? dist : devServer,
        vendor: [
            'es6-object-assign',
            'is-equal',
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: [
                    path.join(__dirname, 'src'),
                ]
            }
        ]
    },

    devServer: {
        host: '0.0.0.0',
        port: '3010',
        hot: true,
        contentBase: path.join(__dirname, '/static')
    }
};
