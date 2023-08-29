// fichier webpack.config.js
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PRODUCTION = true;
const OUTPATH = PRODUCTION ? '../server/public' : './dist';


module.exports = {
    entry: './src/index.js',
    mode: PRODUCTION ? 'production' : 'development',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, OUTPATH),
        filename: 'scripts/bundle.js'
    },
    devServer: {
        static: {
            publicPath: path.resolve(__dirname, 'dist'),
            watch: true
        },
        host: 'localhost',
        port: 2002,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./vendez-le-votre.html"
      })
    ],
    module: {
        rules: [{
                test: /\.m?js*/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
        ]
    },
};