
const webpack = require('webpack');
const path = require('path');

const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = [{
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        entry: './source/javascripts/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: "awesome-typescript-loader" },
                { test: require.resolve('angular') , loader: 'exports-loader?window.angular'},
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
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                angular: "angular",
                _: "underscore"
            }),
            new CheckerPlugin()
        ],
        devtool: "source-map"
    }
]

