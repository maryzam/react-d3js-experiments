 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
    entry: './src/index.proto.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.proto.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3000
    },
     module: {
         rules: [
             {
                 test: /\.jsx?$/,                 
                 exclude: /(node_modules)/,
                 use: 'babel-loader'
             }
         ]
     }
 };