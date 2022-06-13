const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

 
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            /* style and css loader */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: 'images/'
                  }
                },
              },
        ]
    },
    /* plugin */
    plugins: [
        /* HTML Webpack Plugin */
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/scores.html",
            filename: "scores.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/aboutus.html",
            filename: "aboutus.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, './src/images'),
                to: path.resolve(__dirname, 'dist'),
              },
            ],
          }) 
    ]
};
