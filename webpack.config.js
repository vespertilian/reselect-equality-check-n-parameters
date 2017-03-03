var path = require('path');
var config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};

if(process.env.NODE_ENV === 'build') {
    config.output = {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ReselectEqualityCheckNArgs',
        libraryTarget: 'umd'
    }
}
module.exports = config;