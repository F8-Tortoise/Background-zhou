module.exports = {
  devServer: {
    port: 8083,
    open: true
    // proxy:{

    // }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/_variable.scss";'
      }
    }
  }
};
