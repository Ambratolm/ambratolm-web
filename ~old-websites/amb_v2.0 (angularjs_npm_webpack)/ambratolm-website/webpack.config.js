const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 2019,
        open: true
    },
    resolve: {
        alias: {
            ROOT: path.resolve(__dirname, "src")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "head"
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery"
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                include: [path.resolve(__dirname, "src")],
                exclude: /(node_modules)/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, "src")],
                exclude: /(node_modules)/,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader", "css-loader", {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.resolve(__dirname,
                                        "node_modules/bootstrap/scss")
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                include: [path.resolve(__dirname, "src")],
                exclude: /(node_modules)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "[path][name].[ext]",
                        context: "src"
                    }
                }]
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        // runtimeChunk: "single",
        // splitChunks: {
        //     chunks: "all",
        //     minSize: 1000,
        //     maxSize: 200000,
        //     maxInitialRequests: Infinity,
        //     cacheGroups: {
        //         vendor: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name(module) {
        //                 // Get the name of the module package
        //                 // E.g. node_modules/packageName/not/this/part.js
        //                 // or node_modules/packageName
        //                 const packageName =
        //                     module
        //                     .context
        //                     .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        //                 // npm package names are URL-safe, but some
        //                 // servers don't like @ symbols
        //                 return `npm.${packageName.replace('@', '')}`;
        //             }
        //         }
        //     }
        // }
    }
}