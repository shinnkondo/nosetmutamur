
const webpack = require('webpack');
const path = require('path');

const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = [{
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        entry: {
            main: './source/javascripts/index.ts',
            vendor: './source/javascripts/lib/index.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
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
            new CheckerPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // Specify the common bundle's name.
            })
        ],
        devtool: "cheap-eval-source-map"
    }
]

