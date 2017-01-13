
const webpack = require('webpack');
const path = require('path');

const { CheckerPlugin } = require('awesome-typescript-loader')
const SplitByPathPlugin = require('webpack-split-by-path');
module.exports = [{
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    entry: {
        polyfill: './source/javascripts/polyfill.ts',
        main: './source/javascripts/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" },
            { test: require.resolve('angular'), loader: 'exports-loader?window.angular' },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/,
                loader: ['ngtemplate-loader?requireAngular', 'html-loader']
            },
            {
                test: /angular_js\.js/,
                loader: ['imports-loader?window.angular=angular']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            angular: "angular",
            // "window.angular": "angular",
            _: "underscore"
        }),
        new CheckerPlugin(),
        new SplitByPathPlugin([
            {
                name: 'vendor',
                path: path.join(__dirname, 'node_modules')
            }
        ], {
                manifest: 'app-entry'
            }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ) // for angular2 to supress warning during build.
    ],
    devtool: "source-map"
}
]

