
const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
    entry: "./src/index.js",
    externals: [webpackNodeExternals()],
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./")
    },
    target: "node"
};