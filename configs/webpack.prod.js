const path = require( 'path' );
const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const commonConfig = require( './webpack.common.js' );
const buildPath = require('./../build.path');

const ENV = process.env.NODE_ENV = 'production';

/**
 * In order to set API url for development run in the console:
 * npm run develop --apiurl=http://someipaddress:port
 */
const API_URL = ( process.env.npm_config_apiurl ) || 'http://localhost:8080';

/**
 * Configuration object with properties set for production mode.
 */
const productionSpecificConfig = {
    devtool: 'source-map',
    output:
    {
        path: buildPath,
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin( '[name].[hash].css' ),
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin(
            {
                'process.env':
                {
                    'NODE_ENV': JSON.stringify( ENV ),
                    'API_URL': JSON.stringify( API_URL )
                }
            }
        ),
        new webpack.LoaderOptionsPlugin(
            {
                htmlLoader:
                {
                    minimize: false
                }
            }
        ),
         new CompressionPlugin(
             {
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }
        )
    ]
}

/**
 * Merge the common config with the production specific config.
 */
module.exports = webpackMerge( commonConfig, productionSpecificConfig );
