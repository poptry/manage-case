const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: "localhost",
    port: 8080,
    https: false, // 禁用 HTTPS
    hot: true,
    historyApiFallback: true,
    allowedHosts: "all",
  },
});
