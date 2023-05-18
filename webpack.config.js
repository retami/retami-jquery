const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ['./src/bundle.js', './src/css/style.scss'],
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
                use: ['style-loader', 'css-loader',
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
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "src/*.html", to: '[name].html'}
            ],
        }),
    ],
    devtool: 'source-map',
};
