const path = require( 'path' );
const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const commonConfig = require( './webpack.common.js' );

const ENV = process.env.NODE_ENV = 'development';

/**
 * In order to set API url for development run in the console:
 * npm run develop --apiurl=http://someipaddress:port
 */
const API_URL = ( process.env.npm_config_apiurl ) || 'http://localhost:8080';

/**
 * Configuration object with properties set for development mode.
 */
const developSpecificConfig = {
    devtool: 'cheap-module-eval-source-map',
    output:
    {
        path: path.resolve( __dirname, 'static' ),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin( '[name].css' ),
        new webpack.DefinePlugin(
            {
                'process.env':
                {
                    'NODE_ENV': JSON.stringify( ENV ),
                    'API_URL': JSON.stringify( API_URL )
                }
            }
        )
    ],
    devServer: {
        stats: 'minimal'
    }
}

/**
 * Merge the common config with the develop specific config.
 */
module.exports = webpackMerge( commonConfig, developSpecificConfig );
