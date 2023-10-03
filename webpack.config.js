const path = require('path');// Подключаем модуль Node.js для работы с путями на компьютере
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\\.js$/, // преобразовывать нужно только JavaScript-файлы
        exclude: /(node_modules)/, // файлы из директории node_modules трогать не нужно
        use: ['babel-loader'] // какой лоадер использовать
     }
   ]
  }
};
