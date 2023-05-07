// entry -> output
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    }
    ,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                }
            }
        }, {
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "sass-loader",
                },
              ],
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        })
    ],
    devtool: 'source-map'
}
