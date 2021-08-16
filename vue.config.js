const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const webhookUrl = 'https://qyapi.weixin.qq.com'
module.exports = {
  devServer: {
    port: 8086,
    disableHostCheck: true,
    // proxy: url
    proxy: {
      "/cgi-bin": {
        target: webhookUrl,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("services", resolve("src/services"))
      .set("views", resolve("src/views"))
      .set("public", resolve("public"));
  },
}