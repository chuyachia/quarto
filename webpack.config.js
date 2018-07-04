var path = require('path');
var webpack = require('webpack');
module.exports = {
 entry: './src/index.js',
 output: {
     path: path.resolve(__dirname, 'client/js'),
     filename: 'bundle.js'
 },
 module: {
     rules: [
         {
             test: /\.js$/,
             loader: 'babel-loader',
             query: {
                 presets: ['es2015']
             }
         },
         {
             test:/\.hbs$/,
             loader: "handlebars-loader"
             
         }
     ]
 },
 stats: {
     colors: true
 },
 devtool: 'source-map'
};