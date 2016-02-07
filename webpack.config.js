module.exports = {
  context: __dirname,
  entry: [
    './lib/entry.js'
  ],

  externals: {
    'jquery': 'jQuery'
  },

  output: {
    path: './js/',
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        exclude: /node_modules/,

        // Only run `.js` and `.jsx` files through Babel
        test: /\.js$/,

        // Options to configure babel with
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
