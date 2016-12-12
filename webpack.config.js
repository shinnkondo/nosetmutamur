
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './source/javascripts/all.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            { test: /\.coffee$/, loader: "coffee-loader" },
            { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
            { test: require.resolve('angular') , loader: 'exports-loader?window.angular'},
            // { test: /extoc/ , loader: 'imports-loader?jQuery=jquery!script-loader'},
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            angular: "angular",
            _: "underscore"
        })
    ],
    devtool: "source-map"
}

