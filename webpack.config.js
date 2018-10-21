const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const nodeExternals = require('webpack-node-externals');

const commonConfig = {
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                    'sass': [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader?indentedSyntax'
                    ]
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ],
        },
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ],
        },
        {
            test: /\.sass$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
            ],
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new VueLoaderPlugin()
    ],
    externals: [nodeExternals()],
    node: {
        fs: 'empty'
    }
};

module.exports = [
    Object.assign({}, commonConfig, {
        target: 'electron-renderer',
        entry: {
            ui: './src/renderer.js',
        },
        output: {
            filename: 'renderer.js',
            path: path.resolve(__dirname, 'src', 'dist')
        },
    })
];

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
