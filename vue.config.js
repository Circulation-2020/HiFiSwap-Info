module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: {
      "/api": {
        // target: "https://bestswap.info",
        target: "http://13.250.119.162/",
        changeOrigin: true,
      },
    },
  },
};