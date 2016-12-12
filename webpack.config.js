
const webpack = require('webpack');
const path = require('path');

module.exports = [{
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
                {
                    test: /\.scss$/,
                    loaders: ["style-loader", "css-loader", "sass-loader"]
                },
                {
                    test: /\.css$/,
                    loaders: ["style-loader", "css-loader"]
                },
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
]

