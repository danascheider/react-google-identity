module.exports = {
  mode: 'development',
  context: __dirname + '/src',
  entry: __dirname + '/src/sign-in-with-google.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/i,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: [__dirname + '/node_modules']
  }
}