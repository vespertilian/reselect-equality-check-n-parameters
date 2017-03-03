var path = require('path');

var config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ReselectEqualityCheckNArgs',
        libraryTarget: 'umd'
    },
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
    console.log('building dist');
    const umdLibrary = {
        library: 'ReselectEqualityCheckNArgs',
        libraryTarget: 'umd'
    };
    config.output = Object.assign(config.output, umdLibrary);
}
module.exports = config;