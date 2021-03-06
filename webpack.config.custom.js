var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    'VueBm': './app/js/components/VueBm.js',
  },
  output: {
    path: './build/components/',
    filename: '[name].js',
    library: 'VueBm',
    libraryTarget: 'umd'
  },
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.vue'],
    alias: {
       'vue-strap': path.resolve(__dirname, './node_modules/vue-strap/dist/vue-strap')
    }
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'build')
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      {
        test: /\.js$/,
        exclude: /node_modules|vue-strap|vue|vue-loader/,
        loader: 'babel-loader',
        query: { presets: ['es2015'] }
      },
      { test: /\.css$/, loader: "style-loader!css-loader?root=./docs/" },
      { test: /\.eot/, loader: 'file?prefix=font/' },
      { test: /\.woff/, loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf/, loader: 'file?prefix=font/' },
      { test: /\.svg/, loader: 'file?prefix=font/' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ],

  },
  babel: {
    presets: ['es2015'],
    plugins: ["transform-runtime"]
  },
  devtool: 'source-map'

};

if (process.env.NODE_ENV === 'production') {
  delete module.exports.devtool;
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    //new webpack.optimize.CommonsChunkPlugin("init.js")
  ];
}
