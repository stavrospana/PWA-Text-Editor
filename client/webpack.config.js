const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest, GenerateSW} = require('workbox-webpack-plugin');
const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () =>
{
  return {
    mode: 'development',
    entry:
    {
      //sets entry points for main javascript file & PWA installation logic
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output:
    {
      //sets files to be output as [file name].bundle.js, packaged in a folder called 'dist'
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins:
    [
      new HtmlWebpackPlugin(
      {
        //sets HTML template file to index.html, title 'JATE'
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest(
      {
        //sets manifest injection source service worker source & destination files
        swSrc: './src-sw.js',
        swDest: './src-sw.js'
      }),
      new GenerateSW(
      {
        //initializes runtime caching settings for service working
        runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/, //attempts to cache image files
          handler: 'CacheFirst', //caches files immediately
          options:
          {
            cacheName: 'icon', //caches 'icon' files
            expiration: //sets a limit of 1 file in the cache
            {
              maxEntries: 1,
            },
          },
        }],
      }),
      new WebpackPwaManifest(
      {
        //defines application settings & colour choices to be placed in manifest file
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#292640',
        theme_color: '#9287e5',

        //sets start URL & public file path
        start_url: './',
        publicPath: './',

        //sets icon settings
        icons:
        [
          {
            src: path.resolve('./src/images/logo.png'), //sets icon source file path
            size: [96, 128, 192, 256, 384, 512], //defines output icon sizes
            destination: path.join('./assets', './icons'), //sets icon output folder location within 'dist' folder
          },
        ],
      }), 
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          //packages image files as asset/resource files
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
