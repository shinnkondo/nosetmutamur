const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')
module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" },
            { test: require.resolve('angular'), loader: 'exports-loader?window.angular' },
            {
                test: /\.html$/,
                loader: ['ngtemplate-loader?requireAngular', 'html-loader']
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ],
    devtool: "inline-source-map"
}

