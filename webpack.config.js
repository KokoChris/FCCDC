var path = require('path');
var webpack = require('webpack');
module.exports =  {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    // 'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index.js'
  ],
  target: 'web',
  output: {
    path: __dirname , // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
  ],
  resolveLoader: {
      root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },{
       test:/\.scss$/,
       exclude:/node_modules/,
       loader:"style-loader!css-loader!sass-loader"
      }
    ]
  },
    resolve: {
        extensions: ['', '.js', '.jsx','.css']
    }
};
