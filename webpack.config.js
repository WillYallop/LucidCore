const path = require("path");
const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: {
      name: 'lucid-core',
      type: 'umd' 
    }
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
        "fs": false,
        "util": false,
        "path": false,
        "buffer": false,
        "string_decoder": false,
        "constants": false,
        "stream": false,
        "assert": false,
        "crypto": false
      } 
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
