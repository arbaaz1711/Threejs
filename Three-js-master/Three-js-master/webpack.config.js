module.exports = {
  mode: "development",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{ loader: "url-loader" }],
      },
      {
        test: /\.(glb|gltf)$/,
        use:[{loader:'file-loader'}]
      }
    ],
  },
};
