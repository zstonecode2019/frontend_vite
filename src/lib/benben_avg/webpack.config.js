const path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'benben_avg.js',
        clean: true,
        library: 'benben_avg',
    },
    resolve: {
        extensions: ['.js', '.json', '.wasm', '.ts'],
    },
    // target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }, {
                    loader: 'ts-loader',
                }]
            }
        ]
    },
};
