const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackPackLocales = require("./.webpack/helpers/packLocales")

const isProd = process.env.NODE_ENV === "production"

const presets = [
    "@babel/preset-react",
    [
        "@babel/preset-env",
        {
            useBuiltIns: "usage",
            targets: {
                browsers: ["last 2 Chrome versions", "last 2 Edge versions"],
            },
        },
    ],
]

const rootDir = fs.realpathSync(process.cwd())

module.exports = {
    devtool: isProd ? false : "source-map",
    entry: ["./source/client/index.ts"],
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
                        options: {
                            cacheDirectory: true,
                            presets,
                        },
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
    ],
}
