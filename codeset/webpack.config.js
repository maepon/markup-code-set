module.exports = {
  entry: './src/assets/js/main.js',
  output: {
    path: `${__dirname}/htdocs/assets/js`,
    filename: 'main.js'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env',{modules: false}]
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}
