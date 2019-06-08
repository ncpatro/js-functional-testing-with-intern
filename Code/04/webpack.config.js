const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'js', 'app.js'),
    plugins: [
        new HtmlWebpackPlugin({
            title: 'JS Meetup Expense Report'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.ejs$/,
                use: [
                    'ejs-loader'
                ]
            }
        ]
    }
}
