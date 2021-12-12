const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader')

module.exports = {
    mode: 'production',
    target: "node",

    entry: {
        app: "./src/core/index.ts",
    },
    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    plugins: [
        new CheckerPlugin()
    ],

    // Enable inline sourcemaps for debugging webpack's output. (Development)
    devtool: "inline-source-map",

    optimization: {
        runtimeChunk: 'single',
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.(ts|tsx)?$/, use: {
                    loader: "awesome-typescript-loader", options: {
                        transpileOnly: true,
                    }
                }, exclude: /node_modules/,
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    },
};