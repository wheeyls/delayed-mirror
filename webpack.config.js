module.exports = {
  context: __dirname,
  entry: './lib/entry.js',

  output: {
    path: './js/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js']
  }
};
