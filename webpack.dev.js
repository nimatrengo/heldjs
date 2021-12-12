const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack")
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    mode: 'development',

    entry: {
        app: "./src/HTML/index.ts",
        hot: 'webpack/hot/dev-server.js',
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].js',
        path:path.resolve(__dirname , "public"),
        clean: true,
    },

    devServer: {
        static: './public',
        client: false,
        port: 3000,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CheckerPlugin()
    ],

    // Enable inline sourcemaps for debugging webpack's output. (Development)
    devtool: "inline-source-map",

    optimization: {
        runtimeChunk: 'single',
    },

    resolve: {
        alias: {
            "@viYou": path.resolve(__dirname, 'src/core'),
            "@store": path.resolve(__dirname, 'src/core/render/store'),
            "@client": path.resolve(__dirname, 'src/HTML'),
        },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};