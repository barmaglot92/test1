const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackPackLocales = require("./.webpack/helpers/packLocales")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const isProd = process.env.NODE_ENV === "production"

const babelOptions = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    browsers: ["Chrome >= 52", "FireFox >= 44", "Safari >= 7", "Explorer 11", "last 4 Edge versions"],
                },
                useBuiltIns: "usage",
            },
        ],
        "@babel/preset-react",
    ],
}
const rootDir = fs.realpathSync(process.cwd())

module.exports = {
    devtool: isProd ? false : "source-map",
    entry: ["@babel/polyfill", "./source/client/index.ts"],
    output: {
        path: path.resolve(rootDir, "dist", "web"),
        publicPath: "/",
        filename: isProd ? "[name].[hash].js" : "[name].js",
        ...{chunkFilename: isProd ? "[name].vendor.[hash].js" : undefined},
    },
    resolve: {
        modules: ["node_modules", path.resolve(rootDir, "source")],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    mode: isProd ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                use: [{loader: "url-loader?limit=100000&name=[path][name].[ext]"}],
            },
            {test: /\.tsx?$/, enforce: "pre", use: "tslint-loader"},
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions,
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
                include: [path.resolve(rootDir, "source")],
            },
            {
                test: /\.(woff(2)?)$/,
                loader: "url-loader?limit=250000&mimetype=application/font-woff",
            },
            {
                test: /\.(ttf|eot)$/,
                loader: "url-loader?limit=250000&mimetype=application/octet-stream",
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: path.resolve(rootDir, "dist", "web"),
        port: 3002,
        disableHostCheck: true,
        host: "0.0.0.0",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Test app",
            template: "source/client/index.html",
        }),
        new WebpackPackLocales(
            [path.resolve(rootDir, "source/client")],
            ["en", "ru"],
            "ru",
            path.resolve(rootDir, "source")
        ),
        new CopyWebpackPlugin([
            {
                from: path.resolve(rootDir, "source/client/data.json"),
                to: path.resolve(rootDir, "dist", "web", "data.json"),
                force: true,
            },
        ]),
    ],
}
