const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './public/js/index.js',  // Main JS file to bundle
    output: {
        filename: 'bundle.js',  // Output bundle file
        path: path.resolve(__dirname, 'dist'),  // Output directory for the bundle
        clean: true,  // Clean the dist/ folder before each build
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // Transpile JS using Babel
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,  // Load CSS into JavaScript
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',  // Use your existing index.html
            inject: 'body',  // Inject the bundled JS into the body
        }),
    ],
    mode: 'development',  // Switch to 'production' for production builds
};
