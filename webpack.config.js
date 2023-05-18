const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ['./src/index.js', './src/css/style.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve('.', 'dist'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/style.css',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader', options: {sourceMap: true}
                    }
                ]
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "src/img", to: 'img'},
                {from: "src/*.html", to: '[name].html'}
            ],
        }),
    ],
    devtool: 'source-map',
};
