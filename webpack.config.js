const nodeExternals = require('webpack-node-externals' );

module.exports = {
      mode: 'production' ,
      entry: './src/server.ts' ,
      target: "node",
      externals: [nodeExternals()],
      output: {
            path: __dirname,
            filename: 'bundle.js' ,
      },
      resolve: {
            extensions: ['.ts', '.js'],
      },
      module: {
            rules: [
                  {
                  test: /\.tsx?/,
                  use: 'ts-loader' ,
                  exclude: /node_modules/
                  }
            ]
      }
}