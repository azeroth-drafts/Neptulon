const webpack = require( "webpack" );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

/**
 * Configuration object common for the develop and build configurations.
 * Puting '.html' and '.scss' in resolve -> extensions array breaks the
 * develop and production builds.
 */
module.exports = {
    entry: {
        app: './src/main.ts'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.vue' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node-modules/,
                options: {
                    esModule: true
                }
            },
            {
                test: /\.ts$/,
                exclude: /node-modules/,
                loader: 'vue-ts-loader'
            },
            {
                test: /\.html$/,
                exclude: /node-modules/,
                use: 'html-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                exclude: /src/,
                loader: ExtractTextPlugin.extract( {
                    fallback: 'style-loader',
                    use: [ 'css-loader?sourceMap', 'postcss-loader', 'sass-loader' ]
                } )
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin( { name: [ 'app' ] } ),
        new HtmlWebpackPlugin( { template: 'src/index.html' } )
    ]
}